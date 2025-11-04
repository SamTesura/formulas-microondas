"use strict";

/**
 * CALCULADORA DE MICROONDAS - Interfaz de Usuario
 * Sistema moderno de cálculos RF para estudiantes universitarios
 */

(function() {
    // ====================================================
    // CONFIGURACIÓN Y CONSTANTES
    // ====================================================

    const CONFIG = {
        defaultValues: {
            p_tx: 1,
            d: 1,
            f: 1000,
            G_rx: 0,
            G_tx: 0,
            h_1: 10,
            h_2: 10
        },
        validationRules: {
            p_tx: { min: 0.000001, max: 100000, name: 'Potencia' },
            d: { min: 0.001, max: 100000, name: 'Distancia' },
            f: { min: 1, max: 300000, name: 'Frecuencia' },
            G_rx: { min: -50, max: 100, name: 'Ganancia RX' },
            G_tx: { min: -50, max: 100, name: 'Ganancia TX' },
            h_1: { min: 0.1, max: 10000, name: 'Altura TX' },
            h_2: { min: 0.1, max: 10000, name: 'Altura RX' }
        }
    };

    // ====================================================
    // UTILIDADES
    // ====================================================

    /**
     * Formatea un número con decimales fijos
     */
    function formatNumber(num, decimals = 4) {
        if (isNaN(num) || !isFinite(num)) return 'Error';
        return Number(num).toFixed(decimals);
    }

    /**
     * Valida un valor de entrada según las reglas
     */
    function validateInput(key, value) {
        const rule = CONFIG.validationRules[key];
        if (!rule) return { valid: true };

        const numValue = parseFloat(value);

        if (isNaN(numValue)) {
            return {
                valid: false,
                message: `${rule.name} debe ser un número válido`
            };
        }

        if (numValue < rule.min || numValue > rule.max) {
            return {
                valid: false,
                message: `${rule.name} debe estar entre ${rule.min} y ${rule.max}`
            };
        }

        return { valid: true };
    }

    /**
     * Crea un elemento con clases y atributos
     */
    function createElement(tag, classes = [], attributes = {}) {
        const element = document.createElement(tag);
        if (classes.length > 0) {
            element.className = classes.join(' ');
        }
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }

    // ====================================================
    // CONSTRUCCIÓN DE LA INTERFAZ
    // ====================================================

    /**
     * Crea la estructura principal de la aplicación
     */
    function createMainStructure() {
        const container = createElement('div', ['container']);
        document.body.appendChild(container);

        // Encabezado
        const header = createHeader();
        container.appendChild(header);

        // Tarjeta principal de cálculos
        const calculatorCard = createCalculatorCard();
        container.appendChild(calculatorCard);

        // Sección de información educativa
        const infoSection = createInfoSection();
        container.appendChild(infoSection);

        // Pie de página
        const footer = createFooter();
        container.appendChild(footer);

        return container;
    }

    /**
     * Crea el encabezado de la aplicación
     */
    function createHeader() {
        const header = createElement('header', ['header', 'fade-in']);

        const waveIcon = createElement('div', ['wave-icon']);
        waveIcon.textContent = '📡';

        const title = createElement('h1');
        title.textContent = 'Calculadora de Microondas';

        const subtitle = createElement('p', ['subtitle']);
        subtitle.textContent = 'Herramienta de cálculo RF para Ingeniería de Telecomunicaciones';

        header.appendChild(waveIcon);
        header.appendChild(title);
        header.appendChild(subtitle);

        return header;
    }

    /**
     * Crea la tarjeta principal con el formulario de cálculo
     */
    function createCalculatorCard() {
        const card = createElement('div', ['card', 'fade-in']);

        const cardTitle = createElement('h2', ['card-title']);
        cardTitle.textContent = 'Parámetros del Sistema';
        card.appendChild(cardTitle);

        // Grid de inputs
        const inputGrid = createElement('div', ['input-grid']);

        const inputConfigs = [
            {
                key: 'p_tx',
                label: 'Potencia del Transmisor',
                icon: '⚡',
                unit: 'W',
                hint: 'Potencia de salida del transmisor en Watts'
            },
            {
                key: 'f',
                label: 'Frecuencia',
                icon: '〰️',
                unit: 'MHz',
                hint: 'Frecuencia de operación en Megahertz'
            },
            {
                key: 'd',
                label: 'Distancia entre Antenas',
                icon: '📏',
                unit: 'km',
                hint: 'Distancia de separación en kilómetros'
            },
            {
                key: 'G_tx',
                label: 'Ganancia Antena Transmisora',
                icon: '📶',
                unit: 'dB',
                hint: 'Ganancia de la antena TX en decibeles'
            },
            {
                key: 'G_rx',
                label: 'Ganancia Antena Receptora',
                icon: '📡',
                unit: 'dB',
                hint: 'Ganancia de la antena RX en decibeles'
            },
            {
                key: 'h_1',
                label: 'Altura Antena Transmisora',
                icon: '🗼',
                unit: 'm',
                hint: 'Altura sobre el nivel del suelo en metros'
            },
            {
                key: 'h_2',
                label: 'Altura Antena Receptora',
                icon: '🗼',
                unit: 'm',
                hint: 'Altura sobre el nivel del suelo en metros'
            }
        ];

        const inputNodes = {};

        inputConfigs.forEach(config => {
            const inputGroup = createInputGroup(config, inputNodes);
            inputGrid.appendChild(inputGroup);
        });

        card.appendChild(inputGrid);

        // Botones
        const buttonGroup = createElement('div', ['button-group']);

        const calcButton = createElement('button', ['btn-primary']);
        calcButton.innerHTML = '🧮 Calcular Todo';
        calcButton.onclick = () => updateResults(inputNodes);

        const resetButton = createElement('button', ['btn-secondary']);
        resetButton.innerHTML = '🔄 Resetear Valores';
        resetButton.onclick = () => resetInputs(inputNodes);

        buttonGroup.appendChild(calcButton);
        buttonGroup.appendChild(resetButton);
        card.appendChild(buttonGroup);

        // Contenedor de resultados
        const resultsContainer = createElement('div', ['results-container']);
        resultsContainer.id = 'results-container';
        card.appendChild(resultsContainer);

        // Calcular automáticamente al cargar
        setTimeout(() => updateResults(inputNodes), 100);

        // Agregar eventos de cambio en tiempo real
        Object.values(inputNodes).forEach(input => {
            input.addEventListener('input', () => {
                setTimeout(() => updateResults(inputNodes), 300);
            });
        });

        return card;
    }

    /**
     * Crea un grupo de input con label, input y hint
     */
    function createInputGroup(config, inputNodes) {
        const group = createElement('div', ['input-group']);

        const label = createElement('label');
        const iconSpan = createElement('span', ['icon']);
        iconSpan.textContent = config.icon;

        const labelText = document.createTextNode(` ${config.label} `);

        const unitSpan = createElement('span', ['unit']);
        unitSpan.textContent = `(${config.unit})`;

        label.appendChild(iconSpan);
        label.appendChild(labelText);
        label.appendChild(unitSpan);

        const input = createElement('input', [], {
            type: 'number',
            step: 'any',
            placeholder: config.hint
        });
        input.value = CONFIG.defaultValues[config.key];
        inputNodes[config.key] = input;

        const hint = createElement('span', ['input-hint']);
        hint.textContent = config.hint;

        group.appendChild(label);
        group.appendChild(input);
        group.appendChild(hint);

        return group;
    }

    /**
     * Crea la sección de información educativa
     */
    function createInfoSection() {
        const section = createElement('div', ['info-section', 'fade-in']);

        const title = createElement('h3');
        title.textContent = 'Fórmulas y Referencias';
        section.appendChild(title);

        const formulasDiv = createElement('div');
        formulasDiv.innerHTML = `
            <h4 style="color: var(--accent-light); margin-top: 1rem;">📚 Ecuación de Friis (Pérdida en Espacio Libre)</h4>
            <div class="formula-display">
                P_rx (dBm) = P_tx (dBm) + G_tx (dB) + G_rx (dB) - L_0 (dB)
            </div>
            <div class="formula-display">
                L_0 (dB) = 32.5 + 20·log₁₀(d_km) + 20·log₁₀(f_MHz)
            </div>

            <h4 style="color: var(--accent-light); margin-top: 1rem;">📡 Distancia Máxima (Horizonte de Radio)</h4>
            <div class="formula-display">
                d_max (km) = 4.12 · (√h₁ + √h₂)
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">
                donde h₁ y h₂ son las alturas de las antenas en metros
            </p>

            <h4 style="color: var(--accent-light); margin-top: 1rem;">⚡ Conversión de Potencia</h4>
            <div class="formula-display">
                P (dBm) = 10·log₁₀(P_W · 1000)
            </div>
            <div class="formula-display">
                P (W) = 10^((P_dBm - 30) / 10)
            </div>

            <h4 style="color: var(--accent-light); margin-top: 1.5rem;">💡 Conceptos Clave</h4>
            <ul style="margin-top: 0.5rem;">
                <li><strong>dBm:</strong> Potencia relativa a 1 milivatio (mW)</li>
                <li><strong>Ganancia:</strong> Aumento de la señal en dirección específica</li>
                <li><strong>Pérdida de Espacio Libre:</strong> Atenuación natural por la distancia</li>
                <li><strong>Horizonte de Radio:</strong> Alcance máximo considerando curvatura terrestre</li>
            </ul>
        `;
        section.appendChild(formulasDiv);

        return section;
    }

    /**
     * Crea el pie de página
     */
    function createFooter() {
        const footer = createElement('footer', ['footer']);
        footer.innerHTML = `
            <p>Calculadora de Microondas para Estudiantes de Ingeniería</p>
            <p style="margin-top: 0.5rem; font-size: 0.85rem;">
                📖 Diseñado para cálculos rápidos y aprendizaje de conceptos RF
            </p>
        `;
        return footer;
    }

    // ====================================================
    // LÓGICA DE CÁLCULOS Y RESULTADOS
    // ====================================================

    /**
     * Actualiza todos los resultados
     */
    function updateResults(inputNodes) {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) return;

        // Limpiar resultados anteriores
        resultsContainer.innerHTML = '';

        // Obtener y validar valores
        const values = {};
        let hasErrors = false;

        for (const key in inputNodes) {
            const value = inputNodes[key].value;
            const validation = validateInput(key, value);

            if (!validation.valid) {
                showError(resultsContainer, validation.message);
                hasErrors = true;
                inputNodes[key].style.borderColor = 'var(--error-color)';
            } else {
                values[key] = parseFloat(value);
                inputNodes[key].style.borderColor = '';
            }
        }

        if (hasErrors) return;

        // Realizar cálculos
        try {
            // 1. Potencia del receptor en espacio libre
            const p_rx_dbm = calculoesplibre(
                values.p_tx,
                values.d,
                values.f,
                values.G_tx,
                values.G_rx
            );

            // 2. Distancia máxima entre antenas
            const d_max = calculodismax(values.h_1, values.h_2);

            // 3. Potencia del transmisor en dBm
            const p_tx_dbm = calculoganancia(values.p_tx);

            // 4. Pérdida en espacio libre
            const l_0 = 32.5 + 20 * Math.log10(values.d) + 20 * Math.log10(values.f);

            // Mostrar resultados
            createResultItem(
                resultsContainer,
                '📡 Potencia Recibida',
                formatNumber(p_rx_dbm, 2),
                'dBm',
                p_rx_dbm > -80 ? 'success' : 'warning'
            );

            createResultItem(
                resultsContainer,
                '⚡ Potencia Transmitida',
                formatNumber(p_tx_dbm, 2),
                'dBm',
                'success'
            );

            createResultItem(
                resultsContainer,
                '📏 Pérdida en Espacio Libre',
                formatNumber(l_0, 2),
                'dB',
                'warning'
            );

            createResultItem(
                resultsContainer,
                '🌐 Distancia Máxima (Horizonte)',
                formatNumber(d_max, 2),
                'km',
                values.d <= d_max ? 'success' : 'warning'
            );

            // Verificación de viabilidad del enlace
            if (values.d > d_max) {
                showWarning(
                    resultsContainer,
                    `⚠️ La distancia actual (${formatNumber(values.d, 2)} km) excede la distancia máxima del horizonte de radio (${formatNumber(d_max, 2)} km). El enlace podría requerir repetidores o mayor altura de antenas.`
                );
            }

            if (p_rx_dbm < -100) {
                showWarning(
                    resultsContainer,
                    `⚠️ La potencia recibida es muy baja (${formatNumber(p_rx_dbm, 2)} dBm). Considera aumentar la potencia del transmisor, las ganancias de las antenas, o reducir la distancia.`
                );
            }

        } catch (error) {
            showError(resultsContainer, 'Error al calcular: ' + error.message);
            console.error(error);
        }
    }

    /**
     * Crea un elemento de resultado
     */
    function createResultItem(container, label, value, unit, type = '') {
        const item = createElement('div', ['result-item', type, 'fade-in']);

        const labelSpan = createElement('span', ['result-label']);
        labelSpan.textContent = label;

        const valueContainer = createElement('div');
        const valueSpan = createElement('span', ['result-value']);
        valueSpan.textContent = value;

        const unitSpan = createElement('span', ['result-unit']);
        unitSpan.textContent = unit;

        valueContainer.appendChild(valueSpan);
        valueContainer.appendChild(unitSpan);

        item.appendChild(labelSpan);
        item.appendChild(valueContainer);

        container.appendChild(item);
    }

    /**
     * Muestra un mensaje de error
     */
    function showError(container, message) {
        const errorDiv = createElement('div', ['result-item', 'fade-in']);
        errorDiv.style.borderLeftColor = 'var(--error-color)';
        errorDiv.style.background = 'rgba(239, 68, 68, 0.1)';
        errorDiv.innerHTML = `<span style="color: var(--error-color);">❌ ${message}</span>`;
        container.appendChild(errorDiv);
    }

    /**
     * Muestra un mensaje de advertencia
     */
    function showWarning(container, message) {
        const warningDiv = createElement('div', ['result-item', 'warning', 'fade-in']);
        warningDiv.style.borderLeftColor = 'var(--warning-color)';
        warningDiv.style.background = 'rgba(245, 158, 11, 0.1)';
        warningDiv.style.marginTop = 'var(--spacing-lg)';
        warningDiv.innerHTML = `<span style="color: var(--warning-color); font-size: 0.95rem;">${message}</span>`;
        container.appendChild(warningDiv);
    }

    /**
     * Resetea todos los inputs a valores por defecto
     */
    function resetInputs(inputNodes) {
        for (const key in inputNodes) {
            inputNodes[key].value = CONFIG.defaultValues[key];
            inputNodes[key].style.borderColor = '';
        }
        updateResults(inputNodes);
    }

    // ====================================================
    // INICIALIZACIÓN
    // ====================================================

    // Crear la interfaz cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createMainStructure);
    } else {
        createMainStructure();
    }

})();
