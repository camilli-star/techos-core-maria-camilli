
class Usuario {
  constructor(id, nome, email) {
    if (new.target === Usuario) {
      throw new Error("Usuario é uma classe abstrata.");
    }

    if (!nome?.trim() || !email?.trim()) {
      throw new Error("Nome e email são obrigatórios.");
    }

    this.id = id;
    this.nome = nome.trim();
    this.email = email.trim();
  }

  getId() {
    return this.id;
  }

  getNome() {
    return this.nome;
  }

  getEmail() {
    return this.email;
  }
}

class Cliente extends Usuario {
  constructor(id, nome, email, telefone) {
    super(id, nome, email);
    this.telefone = telefone;
  }
}

class Tecnico extends Usuario {
  constructor(id, nome, email, especialidade) {
    super(id, nome, email);
    this.especialidade = especialidade;
  }
}

// FACTORY METHOD
class UsuarioFactory {
  static criarUsuario(tipo, dados) {
    console.log(`[FACTORY] Criando usuário: ${tipo}`);

    switch (tipo.toUpperCase()) {
      case "CLIENTE":
        return new Cliente(
          dados.id,
          dados.nome,
          dados.email,
          dados.telefone
        );

      case "TECNICO":
        return new Tecnico(
          dados.id,
          dados.nome,
          dados.email,
          dados.especialidade
        );

      default:
        throw new Error("Tipo de usuário inválido.");
    }
  }
}

class OrdemServico {
  constructor(id, cliente, tecnico, descricao) {
    if (!(cliente instanceof Cliente)) {
      throw new Error("Cliente inválido.");
    }

    if (!(tecnico instanceof Tecnico)) {
      throw new Error("Técnico inválido.");
    }

    if (!descricao?.trim()) {
      throw new Error("A descrição é obrigatória.");
    }

    this.id = id;
    this.cliente = cliente;
    this.tecnico = tecnico;
    this.descricao = descricao.trim();
    this.status = "ABERTA";
  }

  toJSON() {
    return {
      id: this.id,
      cliente: this.cliente.nome,
      tecnico: this.tecnico.nome,
      descricao: this.descricao,
      status: this.status
    };
  }
}

// SINGLETON
class GerenciadorOS {
  static instancia = null;

  constructor() {
    if (GerenciadorOS.instancia) {
      return GerenciadorOS.instancia;
    }

    this.ordens = [];
    GerenciadorOS.instancia = this;

    console.log("[SINGLETON] GerenciadorOS inicializado.");
  }

  adicionar(ordem) {
    if (!(ordem instanceof OrdemServico)) {
      throw new Error("Ordem de serviço inválida.");
    }

    this.ordens.push(ordem);
  }

  listar() {
    return this.ordens.map(ordem => ordem.toJSON());
  }
}

// EXECUÇÃO DO SISTEMA
const cliente = UsuarioFactory.criarUsuario("CLIENTE", {
  id: 101,
  nome: "Ana",
  email: "ana@exemplo.com",
  telefone: "81999990000"
});

const tecnico = UsuarioFactory.criarUsuario("TECNICO", {
  id: 202,
  nome: "Carlos",
  email: "carlos@exemplo.com",
  especialidade: "Assistência técnica"
});

const gerenciador = new GerenciadorOS();
const outroGerenciador = new GerenciadorOS();

console.log(
  "[TESTE] Instâncias iguais:",
  gerenciador === outroGerenciador
);

const ordem = new OrdemServico(
  1,
  cliente,
  tecnico,
  "Troca de Tela"
);

gerenciador.adicionar(ordem);

console.log("[SISTEMA] Ordem registrada com sucesso!");
console.log(
  JSON.stringify(gerenciador.listar(), null, 2)
);
