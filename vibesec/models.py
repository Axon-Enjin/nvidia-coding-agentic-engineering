"""List NVIDIA models available to this Nebius account without printing credentials."""

import json
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from vibesec.planner import API_BASE


def available_nvidia_models() -> list[str]:
    key = os.environ.get("NEBIUS_API_KEY", "")
    if not key:
        raise RuntimeError("Set NEBIUS_API_KEY in your local environment")
    request = Request(f"{API_BASE}/models", headers={"Authorization": f"Bearer {key}"})
    try:
        with urlopen(request, timeout=15) as response:
            data = json.loads(response.read(64_000))
    except HTTPError as error:
        raise RuntimeError(f"Nebius models request returned HTTP {error.code}") from None
    except (URLError, TimeoutError, OSError, ValueError):
        raise RuntimeError("Could not retrieve the Nebius model catalog") from None
    models = data.get("data", [])
    if not isinstance(models, list):
        raise RuntimeError("Nebius returned an unexpected model catalog")
    return sorted({item["id"] for item in models if isinstance(item, dict) and isinstance(item.get("id"), str) and item["id"].startswith("nvidia/")})


if __name__ == "__main__":
    for model in available_nvidia_models():
        print(model)
