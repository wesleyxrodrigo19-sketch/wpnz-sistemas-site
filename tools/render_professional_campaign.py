from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FRAME_DIR = ROOT / "marketing-videos" / "professional" / "_frames"
OUTPUT_DIR = ROOT / "marketing-videos"
FFMPEG = Path(
    r"C:\Users\wesley.vieira\AppData\Local\Microsoft\WinGet\Packages"
    r"\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe"
    r"\ffmpeg-9.0.1-essentials_build\bin\ffmpeg.exe"
)
FFPROBE = FFMPEG.with_name("ffprobe.exe")

VIDEOS = {
    "acaiteria": "01-acaiteria-vertical-38s.mp4",
    "bar": "02-bar-restaurante-vertical-38s.mp4",
    "hamburgueria": "03-hamburgueria-vertical-38s.mp4",
    "pizzaria": "04-pizzaria-vertical-38s.mp4",
    "marmitaria": "05-marmitaria-vertical-38s.mp4",
    "espetaria": "06-espetaria-vertical-38s.mp4",
    "cafeteria": "07-cafeteria-vertical-38s.mp4",
    "sushi": "08-sushi-vertical-38s.mp4",
    "completo": "09-wpnz-completo-vertical-38s.mp4",
}

DURATIONS = [4.8, 6.2, 6.2, 6.2, 6.2, 4.5, 7.5]
TRANSITION_DURATION = 0.6
TRANSITIONS = ["fade", "smoothleft", "fade", "slideup", "smoothleft", "fadeblack"]


def filter_graph() -> str:
    chains: list[str] = []
    # A gentle 2.5% push-in keeps every screen alive without compromising readability.
    for index, duration in enumerate(DURATIONS):
        frames = int(round(duration * 30))
        chains.append(
            f"[{index}:v]scale=1080:1920,setsar=1,"
            f"zoompan=z='min(zoom+0.00018,1.025)':x='iw/2-(iw/zoom/2)':"
            f"y='ih/2-(ih/zoom/2)':d={frames}:s=1080x1920:fps=30,"
            f"trim=duration={duration},setpts=PTS-STARTPTS[v{index}]"
        )

    previous = "v0"
    offset = DURATIONS[0] - TRANSITION_DURATION
    for index in range(1, len(DURATIONS)):
        output = f"mix{index}"
        chains.append(
            f"[{previous}][v{index}]xfade=transition={TRANSITIONS[index - 1]}:"
            f"duration={TRANSITION_DURATION}:offset={offset:.1f}[{output}]"
        )
        previous = output
        offset += DURATIONS[index] - TRANSITION_DURATION

    chains.append(f"[{previous}]format=yuv420p[vout]")
    return ";".join(chains)


def render(niche: str, filename: str) -> None:
    output = OUTPUT_DIR / filename
    command = [str(FFMPEG), "-hide_banner", "-loglevel", "warning", "-stats_period", "5", "-y"]
    for scene, duration in enumerate(DURATIONS):
        frame = FRAME_DIR / f"{niche}-{scene}.png"
        if not frame.exists():
            raise FileNotFoundError(frame)
        command.extend(["-loop", "1", "-t", str(duration), "-i", str(frame)])

    # Original, understated electronic bed. It is intentionally instrumental so
    # the videos work with or without platform voice-over.
    audio = (
        "0.030*sin(2*PI*110*t)+0.019*sin(2*PI*165*t)+"
        "0.012*sin(2*PI*220*t)+0.007*sin(2*PI*330*t)"
    )
    command.extend(
        [
            "-f",
            "lavfi",
            "-i",
            f"aevalsrc='{audio}':s=48000:d=38",
            "-filter_complex",
            filter_graph(),
            "-map",
            "[vout]",
            "-map",
            "7:a",
            "-af",
            "tremolo=f=2:d=0.45,highpass=f=70,lowpass=f=6000,"
            "afade=t=in:st=0:d=1,afade=t=out:st=36.5:d=1.5,volume=0.8",
            "-c:v",
            "libx264",
            "-preset",
            "fast",
            "-crf",
            "20",
            "-profile:v",
            "high",
            "-level",
            "4.1",
            "-r",
            "30",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-movflags",
            "+faststart",
            "-t",
            "38",
            str(output),
        ]
    )
    print(f"Rendering {filename} ...", flush=True)
    subprocess.run(command, check=True)


def probe(path: Path) -> dict:
    command = [
        str(FFPROBE),
        "-v",
        "error",
        "-show_entries",
        "format=duration:stream=codec_name,width,height,r_frame_rate",
        "-of",
        "json",
        str(path),
    ]
    return json.loads(subprocess.check_output(command, text=True, encoding="utf-8"))


def package() -> None:
    archive = OUTPUT_DIR / "Wpnz-Campanha-Videos-Verticais.zip"
    staging = OUTPUT_DIR / "professional" / "_package"
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir(parents=True)
    for filename in VIDEOS.values():
        shutil.copy2(OUTPUT_DIR / filename, staging / filename)
    shutil.copy2(OUTPUT_DIR / "README-CAMPANHA.md", staging / "README-CAMPANHA.md")
    if archive.exists():
        archive.unlink()
    shutil.make_archive(str(archive.with_suffix("")), "zip", staging)


def main() -> None:
    for niche, filename in VIDEOS.items():
        render(niche, filename)

    manifest = {filename: probe(OUTPUT_DIR / filename) for filename in VIDEOS.values()}
    (OUTPUT_DIR / "professional" / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    package()
    print("Professional campaign complete.", flush=True)


if __name__ == "__main__":
    main()
