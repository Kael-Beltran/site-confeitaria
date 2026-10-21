const form = document.getElementById('formCadastro');
const cepInput = document.getElementById('cep');
const buscarCepButton = document.getElementById('buscar-cep');
const cepStatus = document.getElementById('cep-status');
const pedidoStatus = document.getElementById('pedido-status');

function mostrarStatus(elemento, mensagem, tipo) {
    elemento.textContent = mensagem;
    elemento.className = `campo-status ${tipo}`;
}

function formatarCep(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 8);
    return numeros.length > 5
        ? `${numeros.slice(0, 5)}-${numeros.slice(5)}`
        : numeros;
}

async function buscarCep() {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        cepInput.setAttribute('aria-invalid', 'true');
        mostrarStatus(cepStatus, 'Digite um CEP válido com 8 números.', 'erro');
        cepInput.focus();
        return;
    }

    cepInput.setAttribute('aria-invalid', 'false');
    buscarCepButton.disabled = true;
    mostrarStatus(cepStatus, 'Buscando endereço…', 'carregando');

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!resposta.ok) {
            throw new Error(`Falha na consulta do CEP: HTTP ${resposta.status}`);
        }

        const endereco = await resposta.json();
        if (endereco.erro) {
            mostrarStatus(cepStatus, 'CEP não encontrado. Confira os números e tente novamente.', 'erro');
            return;
        }

        if (cepInput.value.replace(/\D/g, '') !== cep) {
            return;
        }

        document.getElementById('logradouro').value = endereco.logradouro || '';
        document.getElementById('bairro').value = endereco.bairro || '';
        document.getElementById('cidade').value = endereco.localidade || '';
        document.getElementById('estado').value = endereco.estado || endereco.uf || '';
        mostrarStatus(cepStatus, 'Endereço localizado. Confira os dados antes de continuar.', 'sucesso');
    } catch (erro) {
        console.error('Não foi possível consultar o CEP.', erro);
        mostrarStatus(cepStatus, 'Não foi possível buscar o CEP agora. Verifique sua conexão ou preencha o endereço manualmente.', 'erro');
    } finally {
        buscarCepButton.disabled = false;
    }
}

cepInput.addEventListener('input', () => {
    cepInput.value = formatarCep(cepInput.value);
    cepInput.setAttribute('aria-invalid', 'false');
    mostrarStatus(cepStatus, '', '');
});

buscarCepButton.addEventListener('click', buscarCep);

cepInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        buscarCep();
    }
});

form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    const sabor = document.getElementById('bolo').value;
    const quantidade = document.getElementById('quantidade').value;
    pedidoStatus.textContent = `Resumo revisado: ${quantidade} ${sabor}${Number(quantidade) > 1 ? 's' : ''}. Este site ainda não envia pedidos; entre em contato com a confeitaria para confirmar disponibilidade e valor.`;
    pedidoStatus.className = 'pedido-status aviso';
});
