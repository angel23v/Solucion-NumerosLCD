//Requerimos el modulo readline para interactuar con la entrada y salida de la consola
const readline = require('readline');

console.log('RETO DE PROGRAMACION');

const numbersLCD = class {
  //Definimos el constructor
  constructor(numero, altura, ancho) {
    //Definimos los datos ingresados
    this.numero = numero;
    this.altura = altura;
    this.ancho = ancho;

    //Definimos los numeros en su representacion LCD
    //separados por partes para poder dibujar el numero con n de altura y n de ancho ("|","|_|")
    this.numbers_LCD_Data = [
      [
        '  _ ',
        ' |  |', // 0
        ' |_|',
      ],
      [
        '   ',
        '   |', // 1
        '  ',
      ],
      [
        '  _',
        '  _|', // 2
        ' |_',
      ],
      [
        '  _  |',
        '  _  |\n  _ ', // 3
        // '  _  ',
      ],
      [
        ' |_|', // 4
        '     |',
      ],
      [
        '  _ ',
        ' |_ ', // 5
        '  _|',
      ],
      [
        '  _ ',
        '   |',
        ' |_ ', // 6
        ' |_|',
      ],
      [
        '  _ ',
        '   |', // 7
      ],
      [
        '  _ ',
        ' |_  |', // 8
        ' |_|',
      ],
      [
        '  _ ',
        ' |_|', // 9
        '  |',
      ],
    ];
  }

  //Creamos la funcion para desplegar los numeros
  displayNumbers = () => {
    const numeroInput = this.numero;
    const numLines = this.numbers_LCD_Data[numeroInput].length;

    //Dependiendo el numero se hace un loop sobre su longitud de segmentos
    for (let i = 0; i < numLines; i++) {
      let line = '';

      // y ya en cada segmento se le va dando sus "acciones"
      const lcdNumber = this.numbers_LCD_Data[numeroInput];
      let segment = lcdNumber[i];

      // Si es n numero se va a remplazar cierto segmento o se va a duplicar
      // esto ya dependera de los segmentos de cada numero

      if (numeroInput == 0) {
        segment = segment.replace(
          ' |  |',
          ` |${segment.padStart(this.ancho, ' ').replace(' |', '  ')}\n`.repeat(
            this.altura
          )
        );
        segment = segment.replace(/_/g, '_'.repeat(this.ancho));
        //
      } else if (numeroInput == 2) {
        segment = segment
          .replace(/_/g, '_'.repeat(this.ancho))
          .replace(' |', `\n  |`.repeat(this.altura));

        //
      } else if (numeroInput == 3) {
        //
        segment = segment.replace(/_/g, '_'.repeat(this.ancho - 1));

        segment = segment.replace(
          '  |',
          `\n${' '.padStart(this.ancho, ' ')}|`.repeat(this.altura)
        );

        //
      } else if (numeroInput == 4) {
        segment = segment.replace(
          '     |',
          ` ${segment.padStart(this.ancho, ' ')}\n`.repeat(this.altura)
        );
        segment = segment.replace(/_/g, '_'.repeat(this.ancho));
      } else if (numeroInput == 5) {
        segment = segment
          .replace(' |', '\n |'.repeat(this.altura))
          .replace(/_/g, '_'.repeat(this.ancho));
        //
      } else if (numeroInput == 7) {
        segment = segment.replace(/_/g, '_'.repeat(this.ancho));
        segment = segment.replace(
          '  |',
          `${segment.padStart(this.ancho, ' ')}\n `.repeat(this.altura)
        );
        //
      } else if (numeroInput == 8) {
        segment = segment.replace(/_/g, '_'.repeat(this.ancho));

        segment = segment.replace(
          '  |',
          `|${''.padStart(this.ancho, ' ')}|\n `.repeat(this.altura)
        );

        //
      } else if (numeroInput == 9) {
        segment = segment.replace(
          '  |',
          `  ${segment.padStart(this.ancho, ' ')} \n`.repeat(this.altura)
        );

        segment = segment.replace(/_/g, '_'.repeat(this.ancho - 1));
        //
      } else {
        segment = segment.replace('  |', '\n | '.repeat(this.altura));
        segment = segment.replace(/_/g, '_'.repeat(this.ancho));
      }
      line += segment;
      console.log(line);
    }
  };
};

//------------------------------------
//Configuramos la interfaz
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Funcion menu
const mostrarMenu = () => {
  console.log('Elige una opción:');
  console.log('1. Ingresar numero (Medidas 4x4)');
  console.log('2. Ingresar numero con medidas');
  console.log('3. Salir');
};

mostrarMenu();

//Funcion para pedir numero sin medidas
const displayNo = () => {
  rl.question('Escriba el numero: ', (numero) => {
    const defaultNo = new numbersLCD(numero, 4, 4);
    defaultNo.displayNumbers();
    rl.close();
  });
};

//Funcion para pedir numero con medidas
const displayNo_w_Data = () => {
  rl.question('Escriba el Numero: ', (numero) => {
    rl.question('Escriba la Altura: ', (altura) => {
      rl.question('Escriba el Ancho: ', (ancho) => {
        const dataNo = new numbersLCD(numero, altura, ancho);
        dataNo.displayNumbers();
        rl.close();
      });
    });
  });
};

// Funcion para controlar el menu
const handleMenuOption = (option) => {
  switch (option) {
    case '1':
      displayNo();
      break;
    case '2':
      displayNo_w_Data();
      break;
    case '3':
      console.log('Gracias. Buen dia');
      rl.close();
      break;
    default:
      console.log('Opción no válida. Por favor, elige una opción válida.');
      mostrarMenu();
  }
};

rl.on('line', (line) => {
  handleMenuOption(line.trim());
});
