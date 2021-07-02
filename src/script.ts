debugger;


((): void => {
  const input: HTMLTextAreaElement|null = document.querySelector('.input');
  const output: HTMLDivElement|null = document.querySelector('.output');
  const form: HTMLFormElement|null = document.querySelector('.randomly-form');

  if (!input || !output || !form) {
    return;
  }


  const getRandomNumber = (min: number = 0, max: number = 100): Promise<number> => {
    const url = `https://www.random.org/sequences/?min=${ min }&max=${ max }&col=1&format=plain&rnd=new`;

    return fetch(url)
    .then(response => response.text())
    .then(options => parseInt(options.split('\n')[0]));
  }

  const getOptionsFromUrlParams = (): void => {
    const urlParams = new URLSearchParams(window.location.search);
    const options = urlParams.get('options')?.split(/\s?[,;|\t]\s?/) || [];

    input.value = options.join('\n');
  }

  const chooseRandomly = async (event?: Event): Promise<void> => {
    event?.preventDefault();
    output.classList.remove('output--done');
    output.classList.add('output--loading');

    const options = input.value.split(/\s?[,;|\t\n]\s?/) || [];

    const choice = options[await getRandomNumber(0, options.length - 1)];

    output.textContent = choice;

    output.classList.remove('output--loading');
    setTimeout(() => {
      output.classList.add('output--done');
    }, 200);
  };

  getOptionsFromUrlParams();

  chooseRandomly();

  form.addEventListener('submit', chooseRandomly);
})();
