import { describe, test, expect } from "vitest"
import { decodeHTML } from "../utils/helper"

describe("decodeHTML", () => {
    test("decode quotation mark", () => {
        expect(decodeHTML("&quot;Hello&quot;")).toBe("\"Hello\"")
    })

    test("decode apostrophe", () => {
        expect(decodeHTML("Don&#039;t")).toBe("Don't")
    })

    test("empty string gives empty string", () => {
        expect(decodeHTML("")).toBe("")
    })
})