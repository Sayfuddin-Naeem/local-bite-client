import { Upload, Image, XCircle } from "lucide-react";

const PhotoUploader = ({ label, register, error, preview, onChangeEvent }) => (
  <div>
    <label className="block mb-2 text-sm font-medium">
      <Image className="inline w-4 h-4 mr-2 text-primary" /> {label}
    </label>

    <div className="flex items-center gap-4">
      {preview && (
        <div className="avatar">
          <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-2">
            <img src={preview} alt="Preview" />
          </div>
        </div>
      )}

      <label className="flex-1 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          {...register("photoFile")}
          onChange={onChangeEvent}
          className="hidden"
        />
        <div className={`btn btn-active w-full rounded-2xl ${error ? "btn-error" : ""}`}>
          <Upload className="w-4 h-4" />
          {preview ? "Change Photo" : "Upload Photo"}
        </div>
      </label>
    </div>

    {error && (
      <span className="text-xs text-error flex items-center gap-1 mt-1">
        <XCircle className="w-3 h-3" />
        {error.message}
      </span>
    )}
  </div>
);

export default PhotoUploader;
