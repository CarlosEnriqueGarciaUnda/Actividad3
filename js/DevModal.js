class DevModal {
    constructor() {
        this.init();
    }

    init() {
        if (document.querySelector('.devmodal-overlay')) return;

        const modalHTML = `
            <div class="devmodal-overlay" id="devmodal-overlay">
                <div class="devmodal-window">
                    <div class="devmodal-header">
                        <div class="devmodal-buttons">
                            <span class="btn-close" id="devmodal-close"></span>
                            <span class="btn-min"></span>
                            <span class="btn-max"></span>
                        </div>
                        <span class="devmodal-title" id="devmodal-title">document.txt</span>
                        <button class="btn-copy" id="devmodal-copy">Copiar</button>
                    </div>
                    <div class="devmodal-body" id="devmodal-body-container">
                        <div class="devmodal-lines" id="devmodal-lines">1</div>
                        <div class="devmodal-content" id="devmodal-content"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        this.overlay = document.getElementById('devmodal-overlay');
        this.title = document.getElementById('devmodal-title');
        this.lines = document.getElementById('devmodal-lines');
        this.content = document.getElementById('devmodal-content');
        this.bodyContainer = document.getElementById('devmodal-body-container');
        this.closeBtn = document.getElementById('devmodal-close');
        this.copyBtn = document.getElementById('devmodal-copy');

        this.bindEvents();
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });

        this.copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(this.content.textContent).then(() => {
                const originalText = this.copyBtn.textContent;
                this.copyBtn.textContent = '¡Copiado!';
                setTimeout(() => {
                    this.copyBtn.textContent = originalText;
                }, 1500);
            });
        });
    }

    open(options = {}) {
        const titleText = options.title || 'document.txt';
        const contentText = options.content || '';
        const theme = options.theme || 'default';

        this.title.textContent = titleText;
        this.content.textContent = contentText;

        this.bodyContainer.className = 'devmodal-body';
        if (theme === 'error') {
            this.bodyContainer.classList.add('devmodal-theme-error');
        }

        const lineCount = contentText.split('\n').length;
        let linesHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            linesHTML += `${i}<br>`;
        }
        this.lines.innerHTML = linesHTML;

        this.overlay.classList.add('active');
    }

    close() {
        this.overlay.classList.remove('active');
    }
}

const devModal = new DevModal();

document.addEventListener('DOMContentLoaded', () => {
    const cardPerfil = document.getElementById('card-perfil');
    const cardJson = document.getElementById('card-json');
    const cardError = document.getElementById('card-error');

    if (cardPerfil) {
        cardPerfil.addEventListener('click', () => {
            devModal.open({
                title: 'perfil.md',
                content: '# Ingeniero en Sistemas\n\n- Especialidad: Desarrollo Web\n- Stack: JS, HTML, CSS\n- Estado: Activo'
            });
        });
    }

    if (cardJson) {
        cardJson.addEventListener('click', () => {
            devModal.open({
                title: 'config.json',
                content: '{\n  "status": 200,\n  "message": "Conexión exitosa",\n  "data": {\n    "usuario": "Carlos",\n    "rol": "Admin"\n  }\n}'
            });
        });
    }

    if (cardError) {
        cardError.addEventListener('click', () => {
            devModal.open({
                title: 'system_error.log',
                content: 'CRITICAL ERROR: Exception in thread "main"\nNullPointerException at line 42 in DevModal.js\nStack trace: ...',
                theme: 'error'
            });
        });
    }
});