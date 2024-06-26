import { Button } from "@/components/ui";
import { useCallback } from "react";

function useDirAccess() {
  const requestPickingDir = useCallback(() => {
    (async () => {
      const dirHandle = await window.showDirectoryPicker({
        mode: "readwrite",
      });

      for await (const entry of dirHandle.values()) {
        console.log(entry.kind, entry.name);
      }
    })();
  }, []);

  return { requestPickingDir };
}

export default function FileTest() {
  const { requestPickingDir } = useDirAccess();

  return (
    <div>
      <Button onClick={requestPickingDir}>폴더 선택</Button>
    </div>
  );
}
