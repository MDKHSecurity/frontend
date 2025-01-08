import { goto } from "$app/navigation";
import { toast } from "@zerodevx/svelte-toast";

export async function handleResponse(request, successPath) {
  const result = await request.json();

  if (request.ok) {
    toast.push(result.message, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "rgba(72,187,120,0.9)",
        "--toastBarBackground": "#2F855A",
      },
      duration: 2500,
    });
    if (successPath) {
      goto(successPath);
      return result;
    } else {
      return result;
    }
  } else if (request.status === 400) {
    toast.push(result.message, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "#EC9706",
        "--toastBarBackground": "#DD571C",
      },
      duration: 2500,
    });
  } else if (request.status === 401) {
    if (result.isLogin === true) {
      toast.push(result.message, {
        theme: {
          "--toastColor": "mintcream",
          "--toastBackground": "#EC9706",
          "--toastBarBackground": "#DD571C",
        },
        duration: 2500,
      });
    } else {
      window.location.reload();
    }
  } else if (request.status === 403) {
    window.location.reload();
  } else if (request.status === 409) {
    toast.push(result.message, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "#EC9706",
        "--toastBarBackground": "#DD571C",
      },
      duration: 2500,
    });
  } else if (request.status === 429) {
    toast.push(result.message, {
      theme: {
        "--toastColor": "yellow",
        "--toastBackground": "#EC9706",
        "--toastBarBackground": "#DD571C",
      },
      duration: 2500,
    });
  }
  else if (request.status === 500) {
    toast.push(result.message, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "#D30000",
        "--toastBarBackground": "#DD571C",
      },
      duration: 2500,
    });
    goto("/");
  } else {
    return;
  }
}
