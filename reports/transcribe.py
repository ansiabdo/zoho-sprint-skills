import sys
import time
from faster_whisper import WhisperModel

audio = r"C:\Users\ykbadmin\Downloads\ستوريز انفويز.m4a"
out = r"F:\zoho sprint skills\reports\transcript_ar.txt"

model_size = sys.argv[1] if len(sys.argv) > 1 else "small"
print(f"loading model {model_size}", flush=True)
model = WhisperModel(model_size, device="cpu", compute_type="int8")
print("model loaded", flush=True)

start = time.time()
segments, info = model.transcribe(
    audio,
    language="ar",
    vad_filter=True,
    vad_parameters={"min_silence_duration_ms": 700},
    beam_size=5,
    condition_on_previous_text=True,
)
print(f"duration={info.duration:.1f}s language={info.language} prob={info.language_probability:.2f}", flush=True)

with open(out, "w", encoding="utf-8") as f:
    f.write(f"# duration={info.duration:.1f}s model={model_size}\n")
    for seg in segments:
        line = f"[{seg.start:8.1f} -> {seg.end:8.1f}] {seg.text.strip()}"
        f.write(line + "\n")
        f.flush()
print(f"done in {time.time()-start:.1f}s", flush=True)
