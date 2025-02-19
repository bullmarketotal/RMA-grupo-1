# Red de Monitoreo Ambiental - Grupo 1

Plataforma web diseñada para la recepción, procesamiento, almacenamiento y visualización de datos de una red de monitoreo diseñada para alertar ante eventos de turbiedad en el Río Chubut.

### Colaboradores:
* Gonzalo Agú.
* Giannoncelli Giuliano.
* Joaquín Cardoso Díaz.
* Héctor Sánchez.
* Mario Velasquez.

# Indice
- [Problemática](#problemática)
- [Características del producto](#características-del-producto)
- [Instalación](#instalación)
  - Software necesario
  - Clonar repositorio
  - Inicializar backend
  - Inicializar frontend 

# Problemática
El Río Chubut es la única fuente confiable de agua potable para las localidades que componen el VIRCH (Valle Inferior del Río Chubut) y también para otras como Puerto Madryn, pero cada cierto tiempo se presentan eventos de lluvias abundantes que dan lugar al arrastre de sedimentos al caudal principal, **contaminando el agua y haciéndola extremadamente turbia**.
Esto imposibilita o dificulta mucho el proceso de potabilización, obligando a la Cooperativa Eléctrica a **interrumpir** el servicio de potabilización y por lo tanto el servicio de agua potable, para evitar el malfuncionamiento o daño de su maquinaria.

La UNPSJB y el CENPAT estudian la **Cuenca Sagmata**, clave en el aporte de sedimentos tras lluvias. Junto con la Federación Chubutense de Cooperativas y la Facultad de Ingeniería, firmaron un convenio para una **red de monitoreo que detecte estos eventos** con hasta 48 h de anticipación. Se instalaron nodos con sensores de ***temperatura ambiente, nivel hidrométrico del arroyo y batería del nodo**.

# Características del producto

- 📻 Recepción de mensajes MQTT directamente en el backend.

- ✅ Validación de valores antes de almacenarlos.

- 🗼 Creación y gestión de diferentes nodos.
- 🗺 Navegación en un mapa interactivo para visualizar los nodos y sus últimos datos disponibles.
- 🙍‍♂️ Autenticación y roles de usuario, con permisos personalizables para administradores.
- 🚥 Niveles de alerta codificados por color para cada nodo, incluyendo alertas por datos inválidos o batería baja.
- 🔔 Notificaciones push para alertas. Cada usuario puede suscribirse a su conjunto de alertas preferido.

# Instalación

1) Software que se debe tener instalado:
   - [Mosquitto](https://mosquitto.org/): una herramienta open source que implementa el protocolo MQTT que será el que reciba los mensajes de los nodos.
   - Python 3.12 (recomendado)
   - pip
   - git
   - npm

2) Clonar repositorio
   ```bash
   git clone https://github.com/UNPSJB/RMA-grupo-1.git
   ```
   ```bash
   cd ./RMA-grupo-1
   ```
3) Inicializar backend
- Inicializar entorno virtual
   ```bash
   cd ./back
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
- Iniciar servidor
   ```bash
   fastapi dev ./main.py
   ```
  El servidor cargará nodos automáticamente. Si deseas cargar datos (medidas ambientales) a esos nodos, consulta el comando:
   ```bash
   python ./script_carga.py --help
   ```

4) Inicializar frontend
   ```bash
   cd ../front
   npm run dev
   ```
