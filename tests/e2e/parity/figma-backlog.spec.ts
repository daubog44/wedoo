import { expect, test } from "@playwright/test";

const pendingParityFrames: string[] = [];

test.describe("figma parity backlog", () => {
  test("has no unresolved tracked parity frames", async () => {
    expect(pendingParityFrames).toEqual([]);
  });
});
