import { act, renderHook } from "@testing-library/react";
import { useCycleIndex } from "./use-cycle-index";

describe("given useCycleIndex", () => {
  describe("when called with a length", () => {
    const length = 3;

    test("then it should return 0 as the starting index", () => {
      const { result } = renderHook(() => useCycleIndex(length));
      expect(result.current.index).toBe(0);
    });

    test("then it should provide a next function that advances the index and cycles", () => {
      const { result } = renderHook(() => useCycleIndex(length));
      act(() => {
        result.current.next();
      });
      expect(result.current.index).toBe(1);
      act(() => {
        result.current.next();
      });
      expect(result.current.index).toBe(2);
      act(() => {
        result.current.next();
      });
      expect(result.current.index).toBe(0);
    });

    test("then it should provide a previous function that decrements the index and cycles", () => {
      const { result } = renderHook(() => useCycleIndex(length));
      act(() => {
        result.current.previous();
      });
      expect(result.current.index).toBe(2);
      act(() => {
        result.current.previous();
      });
      expect(result.current.index).toBe(1);
      act(() => {
        result.current.previous();
      });
      expect(result.current.index).toBe(0);
    });
  });
});
