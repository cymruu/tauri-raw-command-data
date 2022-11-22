const TAURI = window.__TAURI__;
const { invoke } = window.__TAURI__.tauri;


let greetInputEl;
let greetMsgEl;

async function greet() {
  console.log('asdasda');
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document
    .querySelector("#greet-button")
    .addEventListener("click", () => greet());
  document
    .querySelector("#action-spawn")
    .addEventListener("click", () => spawn())

  document
    .querySelector("#action-execute")
    .addEventListener("click", () => execute())
});


async function spawn() {
  const command = new TAURI.shell.Command('ipconfig', [], { encoding: 'raw' });
  command.on('close', data => {
    console.log(`command finished with code ${data.code} and signal ${data.signal}`)
  });
  command.on('error', error => console.error(`command error: "${error}"`));
  command.stdout.on('data', line => console.log(`command stdout: "${line}"`, line));
  command.stderr.on('data', line => console.log(`command stderr: "${line}"`, line));
  const child = await command.spawn();
  console.log('pid:', child.pid);
}


async function execute() {
  const command = new TAURI.shell.Command('ipconfig', [], { encoding: 'raw' });
  const result = await command.execute();
  console.log({ result });
}
