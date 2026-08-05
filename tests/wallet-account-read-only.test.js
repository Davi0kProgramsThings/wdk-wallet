import { describe, expect, test } from '@jest/globals'

import {
  WalletAccountReadOnly,
  TimeoutError
} from '../index.js'

class DummyWalletAccountReadOnly extends WalletAccountReadOnly {
  async getBalance () {
    return 0
  }

  async getTokenBalance () {
    return 0
  }

  async quoteSendTransaction (tx) {
    return { fee: 0 }
  }

  async quoteTransfer (options) {
    return { fee: 0 }
  }

  async getTransactionReceipt (hash) {
    return null
  }
}

/**
 * A dummy account whose getTransaction returns a scripted sequence of receipts,
 * so the shared waitForTransaction loop can be exercised deterministically.
 */
class ScriptedWalletAccountReadOnly extends DummyWalletAccountReadOnly {
  constructor (sequence) {
    super(ADDRESS)
    this._sequence = sequence
    this.calls = 0
  }

  async getTransaction (hash) {
    const item = this._sequence[Math.min(this.calls, this._sequence.length - 1)]
    this.calls += 1
    return item
  }

  get _defaultWaitInterval () {
    return 1
  }

  get _defaultWaitTimeout () {
    return 50
  }
}

const ADDRESS = '0xa460AEbce0d3A4BecAd8ccf9D6D4861296c503Bd'
const HASH = '0xabc'

describe('WalletAccountReadOnly', () => {
  describe('getAddress', () => {
    test('should return the correct address', async () => {
      const account = new DummyWalletAccountReadOnly(ADDRESS)
      const address = await account.getAddress()
      expect(address).toBe(ADDRESS)
    })

    test('should throw if the address is not set', async () => {
      const account = new DummyWalletAccountReadOnly()

      await expect(account.getAddress())
        .rejects.toThrow("The account's address must be set to perform this operation.")
    })
  })

  describe('getTransaction', () => {
    test('should throw NotImplementedError by default', async () => {
      const account = new DummyWalletAccountReadOnly(ADDRESS)
      await expect(account.getTransaction(HASH)).rejects.toThrow("Method 'getTransaction(hash)' must be implemented.")
    })
  })

  describe('_meetsFinality', () => {
    const account = new DummyWalletAccountReadOnly(ADDRESS)

    test("target 'confirmed' is met by confirmed and final", () => {
      expect(account._meetsFinality('confirmed', 'confirmed')).toBe(true)
      expect(account._meetsFinality('final', 'confirmed')).toBe(true)
      expect(account._meetsFinality('pending', 'confirmed')).toBe(false)
    })

    test("target 'final' is met only by final", () => {
      expect(account._meetsFinality('final', 'final')).toBe(true)
      expect(account._meetsFinality('confirmed', 'final')).toBe(false)
      expect(account._meetsFinality('pending', 'final')).toBe(false)
    })
  })

  describe('waitForTransaction', () => {
    test('resolves once the confirmed target is reached', async () => {
      const confirmed = { id: HASH, finality: 'confirmed', success: true }
      const account = new ScriptedWalletAccountReadOnly([
        null,
        { id: HASH, finality: 'pending', success: undefined },
        confirmed
      ])

      const receipt = await account.waitForTransaction(HASH)
      expect(receipt).toBe(confirmed)
      expect(account.calls).toBe(3)
    })

    test("keeps polling past 'confirmed' when target is 'final'", async () => {
      const final = { id: HASH, finality: 'final', success: true }
      const account = new ScriptedWalletAccountReadOnly([
        { id: HASH, finality: 'confirmed', success: true },
        final
      ])

      const receipt = await account.waitForTransaction(HASH, { target: 'final' })
      expect(receipt).toBe(final)
    })

    test('returns the receipt when the transaction reverts, without throwing', async () => {
      const failed = { id: HASH, finality: 'final', success: false }
      const account = new ScriptedWalletAccountReadOnly([failed])

      const receipt = await account.waitForTransaction(HASH)
      expect(receipt).toBe(failed)
    })

    test('returns the receipt when the transaction is dropped on consecutive polls', async () => {
      const dropped = { id: HASH, finality: 'dropped', success: undefined }
      const account = new ScriptedWalletAccountReadOnly([dropped])

      const receipt = await account.waitForTransaction(HASH)
      expect(receipt).toBe(dropped)
    })

    test('debounces a transient drop that recovers to confirmed', async () => {
      const confirmed = { id: HASH, finality: 'confirmed', success: true }
      const account = new ScriptedWalletAccountReadOnly([
        { id: HASH, finality: 'dropped', success: undefined },
        confirmed
      ])

      const receipt = await account.waitForTransaction(HASH)
      expect(receipt).toBe(confirmed)
      expect(account.calls).toBe(2)
    })

    test('throws TimeoutError carrying the last-seen receipt', async () => {
      const pending = { id: HASH, finality: 'pending', success: undefined }
      const account = new ScriptedWalletAccountReadOnly([pending])

      await account.waitForTransaction(HASH, { timeout: 10, interval: 1 }).catch(err => {
        expect(err).toBeInstanceOf(TimeoutError)
        expect(err.receipt).toBe(pending)
      })
    })

    test('timeout receipt is null when the tx was never seen', async () => {
      const account = new ScriptedWalletAccountReadOnly([null])

      await account.waitForTransaction(HASH, { timeout: 10, interval: 1 }).catch(err => {
        expect(err).toBeInstanceOf(TimeoutError)
        expect(err.receipt).toBeNull()
      })
    })
  })
})
