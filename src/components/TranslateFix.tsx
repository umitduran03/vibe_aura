"use client";

import { useEffect } from "react";

export default function TranslateFix() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof Node === "function" && Node.prototype) {
      // Patch removeChild
      const originalRemoveChild = Node.prototype.removeChild;
      // @ts-ignore - Bypass TS strict generic constraints for DOM monkey-patch
      Node.prototype.removeChild = function (child) {
        if (child.parentNode !== this) {
          if (console) {
            console.warn(
              "Translate crash prevented: Cannot remove a child from a different parent",
              child,
              this
            );
          }
          return child;
        }
        return originalRemoveChild.apply(this, arguments as any);
      };

      // Patch insertBefore
      const originalInsertBefore = Node.prototype.insertBefore;
      // @ts-ignore - Bypass TS strict generic constraints for DOM monkey-patch
      Node.prototype.insertBefore = function (newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (console) {
            console.warn(
              "Translate crash prevented: Cannot insert before a reference node from a different parent",
              referenceNode,
              this
            );
          }
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments as any);
      };
    }
  }, []);

  return null;
}
