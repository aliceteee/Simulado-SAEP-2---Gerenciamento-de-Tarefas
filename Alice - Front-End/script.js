
const API = 'http://localhost:3000';

const routes = {
  usuarios: {
    listar: '/usuarios/listar',
    cadastrar: '/usuarios/cadastrar'
  },

  tarefas: {
    listar: '/tarefas/listar',
    cadastrar: '/tarefas/cadastrar',
    buscar: id => `/tarefas/buscar/${id}`,
    atualizar: id => `/tarefas/atualizar/${id}`,
    excluir: id => `/tarefas/excluir/${id}`
  }
};

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(API + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
  } catch (_) {
    throw new Error(
      'Não foi possível conectar ao backend. Verifique se o npm run dev está ativo na porta 3000.'
    );
  }

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.mensagem ||
      `Não foi possível concluir a operação (HTTP ${response.status}).`
    );
  }

  return data;
}

function showMessage(text, type = 'success') {
  const element = document.querySelector('#mensagem');

  if (!element) return;

  element.textContent = text;
  element.className = `message ${type}`;
}

function toggleSubmit(form, busy) {
  const button = form.querySelector('button[type="submit"]');

  if (button) {
    button.disabled = busy;
  }
}

async function initUsuarios() {
  const form = document.querySelector('#form-usuario');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (!nome || !email) {
      return showMessage(
        'Preencha todos os campos obrigatórios.',
        'error'
      );
    }

    toggleSubmit(form, true);

    try {
      await request(routes.usuarios.cadastrar, {
        method: 'POST',
        body: JSON.stringify({ nome, email })
      });

      showMessage('cadastro concluído com sucesso');
      form.reset();

    } catch (error) {
      showMessage(error.message, 'error');

    } finally {
      toggleSubmit(form, false);
    }
  });
}

async function loadUsuarios() {
  const select = document.querySelector('#usuarioId');

  try {
    const usuarios = await request(routes.usuarios.listar);

    if (!Array.isArray(usuarios)) {
      throw new Error('Resposta inesperada ao listar usuários.');
    }

    select.replaceChildren();

    const placeholder = document.createElement('option');

    placeholder.value = '';
    placeholder.textContent = usuarios.length
      ? 'Selecione um usuário'
      : 'Nenhum usuário cadastrado';

    select.append(placeholder);

    usuarios.forEach(usuario => {
      const option = document.createElement('option');

      option.value = usuario.id;
      option.textContent = usuario.nome;

      select.append(option);
    });

    return usuarios;

  } catch (error) {
    select.replaceChildren();

    const option = document.createElement('option');

    option.value = '';
    option.textContent = 'Erro ao carregar usuários';

    select.append(option);

    showMessage(error.message, 'error');

    return [];
  }
}

async function initTarefas() {
  const form = document.querySelector('#form-tarefa');
  const editId = new URLSearchParams(location.search).get('editar');
  const usuarios = await loadUsuarios();

  if (editId) {
    document.querySelector('#titulo-tarefa').innerHTML =
      'Editar <em>tarefa</em><span class="sparkle">✳</span>';

    document.querySelector('#titulo-form').textContent =
      'Editar tarefa';

    document.querySelector('#subtitulo-tarefa').textContent =
      'Atualize os detalhes da tarefa selecionada.';

    document.querySelector('#salvar-tarefa').innerHTML =
      'Salvar alterações <span>↗</span>';

    document.querySelector('#edit-status-wrap').hidden = false;

    try {
      const tarefa = await request(routes.tarefas.buscar(editId));

      form.descricao.value = tarefa.descricao;
      form.setor.value = tarefa.setor;
      form.usuarioId.value = String(tarefa.usuarioId);
      form.prioridade.value = tarefa.prioridade;

      document.querySelector('#status').value = tarefa.status;

      if (!usuarios.some(u => u.id === tarefa.usuarioId)) {
        showMessage(
          'O usuário vinculado não está disponível na lista.',
          'error'
        );
      }

    } catch (error) {
      showMessage(error.message, 'error');
    }
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const usuarioId = Number(form.usuarioId.value);
    const descricao = form.descricao.value.trim();
    const setor = form.setor.value.trim();
    const prioridade = form.prioridade.value;

    if (!usuarioId || !descricao || !setor || !prioridade) {
      return showMessage(
        'Preencha todos os campos obrigatórios.',
        'error'
      );
    }

    const data = {
      usuarioId,
      descricao,
      setor,
      prioridade
    };

    if (editId) {
      data.status = document.querySelector('#status').value;
    }

    toggleSubmit(form, true);

    try {
      await request(
        editId
          ? routes.tarefas.atualizar(editId)
          : routes.tarefas.cadastrar,
        {
          method: editId ? 'PUT' : 'POST',
          body: JSON.stringify(data)
        }
      );

      showMessage(
        editId
          ? 'Tarefa atualizada com sucesso!'
          : 'cadastro concluído com sucesso'
      );

      if (!editId) {
        form.reset();
      }

    } catch (error) {
      showMessage(error.message, 'error');

    } finally {
      toggleSubmit(form, false);
    }
  });
}

const statuses = [
  { key: 'A_FAZER', label: 'A fazer' },
  { key: 'FAZENDO', label: 'Fazendo' },
  { key: 'PRONTO', label: 'Pronto' }
];

const priorityLabels = {
  BAIXA: 'Baixa prioridade',
  MEDIA: 'Média prioridade',
  ALTA: 'Alta prioridade'
};

function element(tag, className, content) {
  const node = document.createElement(tag);

  if (className) {
    node.className = className;
  }

  if (content !== undefined) {
    node.textContent = content;
  }

  return node;
}

function meta(label, value) {
  const line = element('div', 'meta');
  const strong = element('b', '', label + ': ');

  line.append(
    strong,
    document.createTextNode(value || 'Não informado')
  );

  return line;
}

function createCard(tarefa) {
  const card = element('article', 'task-card');

  const priority = element(
    'span',
    `priority ${tarefa.prioridade}`,
    priorityLabels[tarefa.prioridade] || tarefa.prioridade
  );

  const title = element('h3', '', tarefa.descricao);
  const setor = meta('Setor', tarefa.setor);

  const usuario = meta(
    'Vinculado a',
    tarefa.usuario?.nome || `Usuário #${tarefa.usuarioId}`
  );

  const actions = element('div', 'card-actions');

  const edit = element('a', 'small-btn', '✎ Editar');

  edit.href = `tarefas.html?editar=${encodeURIComponent(tarefa.id)}`;

  const remove = element('button', 'small-btn danger', 'Excluir');

  remove.type = 'button';

  remove.addEventListener('click', async () => {
    if (!confirm(
      `Deseja realmente excluir a tarefa "${tarefa.descricao}"?`
    )) return;

    remove.disabled = true;

    try {
      await request(routes.tarefas.excluir(tarefa.id), {
        method: 'DELETE'
      });

      showMessage('Tarefa excluída com sucesso.');

      await loadTarefas();

    } catch (error) {
      showMessage(error.message, 'error');
      remove.disabled = false;
    }
  });

  actions.append(edit, remove);

  const statusForm = element('form', 'status-form');

  statusForm.append(
    element('p', '', 'Alterar status:')
  );

  const options = element('div', 'status-options');

  for (const status of statuses) {
    const label = element('label');
    const input = document.createElement('input');

    input.type = 'radio';
    input.name = `status-${tarefa.id}`;
    input.value = status.key;
    input.checked = tarefa.status === status.key;

    label.append(
      input,
      document.createTextNode(status.label)
    );

    options.append(label);
  }

  const submit = element(
    'button',
    'small-btn',
    'Alterar status'
  );

  submit.type = 'submit';

  statusForm.append(options, submit);

  statusForm.addEventListener('submit', async event => {
    event.preventDefault();

    const status = statusForm.querySelector('input:checked')?.value;

    if (!status) return;

    submit.disabled = true;

    try {
      await request(routes.tarefas.atualizar(tarefa.id), {
        method: 'PUT',
        body: JSON.stringify({ status })
      });

      showMessage('Status atualizado com sucesso!');

      await loadTarefas();

    } catch (error) {
      showMessage(error.message, 'error');
      submit.disabled = false;
    }
  });

  card.append(
    priority,
    title,
    setor,
    usuario,
    actions,
    statusForm
  );

  return card;
}

async function loadTarefas() {
  try {
    const tarefas = await request(routes.tarefas.listar);

    if (!Array.isArray(tarefas)) {
      throw new Error('Resposta inesperada ao listar tarefas.');
    }

    for (const status of statuses) {
      const lane = document.getElementById(
        `lane-${status.key}`
      );

      const items = tarefas.filter(
        tarefa => tarefa.status === status.key
      );

      document.getElementById(
        `count-${status.key}`
      ).textContent = items.length;

      lane.replaceChildren();

      if (!items.length) {
        lane.append(
          element('div', 'empty', 'Nenhuma tarefa por aqui ✧')
        );
      } else {
        items.forEach(tarefa => {
          lane.append(createCard(tarefa));
        });
      }
    }

  } catch (error) {
    showMessage(error.message, 'error');
  }
}

const page = document.body.dataset.page;

if (page === 'usuarios') {
  initUsuarios();
}

if (page === 'tarefas') {
  initTarefas();
}

if (page === 'gerenciar') {
  loadTarefas();
}
