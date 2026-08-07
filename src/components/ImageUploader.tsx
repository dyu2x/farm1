import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Link, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  presetImages?: { label: string; url: string }[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Product or Asset Image',
  presetImages = []
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, etc.).');
      return;
    }

    // Limit size to ~5MB to avoid localStorage quota issues
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB. Please choose a smaller image or compress it.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
        setUrlInput(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#8FA38F]">{label}</label>
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
              mode === 'upload'
                ? 'bg-[#3D6E3D] text-white'
                : 'bg-[#121E12] text-[#8FA38F] hover:text-[#C5D8C5]'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
              mode === 'url'
                ? 'bg-[#3D6E3D] text-white'
                : 'bg-[#121E12] text-[#8FA38F] hover:text-[#C5D8C5]'
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      {/* Mode 1: File Drag & Drop Upload */}
      {mode === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-[#3D6E3D] bg-[#3D6E3D]/20 scale-[1.01]'
              : 'border-[#2D422D] bg-[#121E12] hover:border-[#3D6E3D] hover:bg-[#1A281A]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          {value ? (
            <div className="relative w-full flex items-center justify-between gap-3 p-2 bg-[#1A281A] rounded-xl border border-[#2D422D]">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={value}
                  alt="Preview"
                  className="w-12 h-12 rounded-lg object-cover border border-[#2D422D] flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left overflow-hidden">
                  <span className="text-xs font-bold text-[#E2EFE2] block truncate">
                    {value.startsWith('data:') ? 'Custom Uploaded File' : 'Selected Image'}
                  </span>
                  <span className="text-[10px] text-[#8FA38F] block truncate">
                    Click or drag to replace
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                  setUrlInput('');
                }}
                className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 transition-colors flex-shrink-0"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-[#233623] text-[#A8CDA8] flex items-center justify-center border border-[#2D422D]">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#E2EFE2] block">
                  Click to upload or drag & drop image
                </span>
                <span className="text-[10px] text-[#8FA38F]">
                  PNG, JPG, WEBP, GIF up to 5MB
                </span>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Mode 2: Direct URL Input */
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 bg-[#121E12] border border-[#2D422D] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-[#3D6E3D]"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-3 py-2 rounded-xl bg-[#3D6E3D] hover:bg-[#2E572E] text-white text-xs font-bold transition-colors"
            >
              Apply
            </button>
          </div>
          {value && (
            <div className="flex items-center gap-2 text-[11px] text-[#8FA38F]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Active URL image connected</span>
            </div>
          )}
        </div>
      )}

      {/* Optional Preset Sample Images */}
      {presetImages.length > 0 && (
        <div className="pt-1">
          <span className="text-[10px] font-bold text-[#8FA38F] block mb-1.5 uppercase tracking-wider">
            Quick Select Preset Hatchery Photos
          </span>
          <div className="flex flex-wrap gap-2">
            {presetImages.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(preset.url);
                  setUrlInput(preset.url);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                  value === preset.url
                    ? 'bg-[#3D6E3D] text-white border-[#3D6E3D] font-bold'
                    : 'bg-[#121E12] text-[#8FA38F] border-[#2D422D] hover:text-[#C5D8C5] hover:border-[#3D6E3D]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
