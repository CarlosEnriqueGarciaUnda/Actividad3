class DevModal {
    constructor() {
        this.overlayId = 'devmodal-overlay';
        this.currentContent = '';
        this._buildDOM();
        this._registerGlobalEvents();
    }

    _buildDOM() {
        if (document.getElementById(this.overlayId)) return;

        const overlay = document.createElement('div');
        overlay.id = this.overlayId;
        overlay.className = 'devmodal-overlay';

        overlay.innerHTML = `
            <div class="devmodal-window" id="devmodal-window">
                <div class="devmodal-header">
                    <div class="devmodal-buttons">
                        <span class="btn-close" id="devmodal-close" title="Cerrar"></span>
                        <span class="btn-min"></span>
                        <span class="btn-max"></span>
                    </div>
                    <div class="devmodal-title" id="devmodal-title">archivo.txt</div>
                    <button class="btn-copy" id="devmodal-copy" title="Copiar código">📋 Copiar</button>
                </div>
                <div class="devmodal-body">
                    <div class="devmodal-lines" id="devmodal-lines">1</div>
                    <div class="devmodal-content" id="devmodal-content"></div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById('devmodal-close').addEventListener('click', () => this.close());
        document.getElementById('devmodal-copy').addEventListener('click', () => this._copyToClipboard());
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });
    }

    // Escucha eventos globales como presionar la tecla 'Escape'
    _registerGlobalEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    // Funcion interna para copiar el contenido al portapapeles
    _copyToClipboard() {
        navigator.clipboard.writeText(this.currentContent).then(() => {
            const copyBtn = document.getElementById('devmodal-copy');
            copyBtn.innerText = '✅ ¡Copiado!';
            setTimeout(() => { copyBtn.innerText = '📋 Copiar'; }, 2000);
        });
    }

    _generateLineNumbers(text) {
        const lineCount = text.split('\n').length;
        let linesHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            linesHTML += `${i}\n`;
        }
        return linesHTML;
    }

    // Metodo PÚBLICO para abrir el modal con parámetros
    open({ title = 'archivo.txt', content = '', theme = 'default' }) {
        this.currentContent = content;
        const overlay = document.getElementById(this.overlayId);
        const windowEl = document.getElementById('devmodal-window');

        document.getElementById('devmodal-title').innerText = title;
        document.getElementById('devmodal-content').innerText = content;
        document.getElementById('devmodal-lines').innerText = this._generateLineNumbers(content);

        // Aplicar clase de tema
        windowEl.className = `devmodal-window devmodal-theme-${theme}`;

        // Mostrar con animación
        overlay.classList.add('active');
    }

    close() {
        const overlay = document.getElementById(this.overlayId);
        if (overlay) overlay.classList.remove('active');
    }
}

const devModal = new DevModal();