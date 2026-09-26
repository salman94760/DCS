import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import api from "@/api/axios";

export default function SignatureModal({ isOpen, onClose, onSaved }) {
  const signatureRef = useRef(null);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  const handleSave = async () => {
    if (!signatureRef.current) return;

    if (signatureRef.current.isEmpty()) {
      alert("Please sign first.");
      return;
    }

    const userJson = localStorage.getItem("user");

    const user = JSON.parse(userJson);

    console.log(user);

    const userId = user?.id;

    console.log("User ID:", userId);

    try {
      setSaving(true);

      const signature = signatureRef.current.getCanvas().toDataURL("image/png");

      const response = await api.post("/signature/save", {
        signature,
        userId,
      });

      console.log("Signature saved:", response.data);

      onSaved?.(response.data);

      onClose();
    } catch (error) {
      console.error("Signature error:", error);

      alert(error.response?.data?.message || "Failed to save signature");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Add Signature
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {/* Signature Pad */}
        <div className="p-6">
          <p className="mb-3 text-sm text-slate-500">
            Please sign inside the box below.
          </p>

          <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                width: 550,
                height: 250,
                className: "w-full h-[250px]",
              }}
            />
          </div>

          {/* Buttons */}
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm hover:bg-slate-50"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "OK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
