var juego = function () {

    //Puntero que va a apuntar a una funcion de este objeto creando un loop
    var punt = this;
    //con screen se obtine el ancho y el alto de la resolucion de la pantalla para que ocupe todo el ancho y el alto
    this.ancho = screen.width/10;
    //le resto 200 a la altura para poder colocar los botones
    //se divide entre 10, que son los 10px de cada celda para poder calcular el X y el Y
    this.altura = (screen.height - 200)/10;
    this.tablero = document.getElementById('tablero');
    this.celdas = [];
    this.intervalo;
    this.sig_tablero = [];

    this.crearTablero = function () {
        //
        this.tablero.style.width = this.ancho * 10 + 'px';
        this.tablero.style.height = this.altura * 10 + 'px';
        var num_celdas = this.ancho * this.altura;
        for (var i = 0; i < num_celdas; i++) {
            var nueva_celda = document.createElement('div');
            this.tablero.appendChild(nueva_celda);
        }
        //se agrega todos los divs generados en el array celdas
        this.celdas = this.tablero.querySelectorAll('div');
        for (var i = 0; i < this.celdas.length; i++) {
            this.celdas[i].addEventListener('click', function () {
                this.classList.toggle('vivo');
            });
        }
    }
    //con esta funcion se obtiene la posicion x y del tablero
    this.pos = function (x, y) {
        var index = y * this.ancho + x;
        return this.celdas[index];
    }
    //funcion que agrega el estado de la celda un una posicion
    this.setEstado = function (x, y, estado) {
        if (estado == 'vivo') {
            this.pos(x, y).classList.add('vivo');
        } 
        else if (estado == 'muerto') {
            this.pos(x, y).classList.remove('vivo');
        }
    }
    //funcion para hallar las celdas que va a morir o vivir
    this.sig_estado_celdas = function (x, y) {
        var vecinos_vivos = 0;
        for (var i = y - 1; i < y + 2; i++) {
            for (var j = x - 1; j < x + 2; j++) {
                if (i != y || j != x) {
                    if (i >= 0 && i < this.altura && j >= 0 && j < this.ancho) {
                        if (this.pos(j, i).className === 'vivo') {
                            vecinos_vivos++;
                        }
                    }
                }
            }
        }
        if (this.pos(x, y).className === 'vivo') {
            if (vecinos_vivos == 2 || vecinos_vivos == 3) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (vecinos_vivos == 3) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    //funcion para ingresar los estados generados por la anterior teblero al siguiente
    this.sig_generacion = function () {
        this.sig_tablero = [];
        for (var i = 0; i < this.altura; i++) {
            for (var j = 0; j < this.ancho; j++) {
                this.sig_tablero.push(this.sig_estado_celdas(j, i));
            }
        }
    }
    //loop
    this.set_class = function () {
        punt.sig_generacion();
        for (var i = 0; i < punt.celdas.length; i++) {
            punt.celdas[i].classList.remove('vivo');
            if (punt.sig_tablero[i] === 1) {
                punt.celdas[i].classList.add('vivo');
            }
        }
    }
    //patron glider 
    this.firstLife = function () {

        /*
        this.setEstado(3, 3, 'vivo');
        this.setEstado(3, 4, 'vivo');
        this.setEstado(3, 5, 'vivo');
        this.setEstado(2, 5, 'vivo');
        this.setEstado(1, 4, 'vivo');
        */
        //11 patrones para comprobar que el algoritmo funciona
        for (var i = 0; i < 11; i++) {
            this.setEstado(3 + (i*10), 3 + (i*10), 'vivo');
            this.setEstado(3 + (i*10), 4 + (i*10), 'vivo');
            this.setEstado(3 + (i*10), 5 + (i*10), 'vivo');
            this.setEstado(2 + (i*10), 5 + (i*10), 'vivo');
            this.setEstado(1 + (i*10), 4 + (i*10), 'vivo');
            
        }
       
    }
    this.start = function () {
        this.crearTablero();
        this.firstLife();
        this.set_class();
    }
    this.play = function () {
        punt.pause();
        punt.intervalo = setInterval(punt.set_class, 100);
    }
    this.pause = function () {
        clearInterval(punt.intervalo);
    }
    document.getElementById('play').addEventListener('click', this.play);
    document.getElementById('pause').addEventListener('click', this.pause);
}

var game = new juego();
game.start();


