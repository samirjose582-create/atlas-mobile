# Atlas Mobile

App web instalável (Android e iPhone) para conversar com o Atlas do notebook de qualquer lugar.
Conversa por voz ou texto, confirmações com Sim/Não, painel do notebook e as sessões do Claude Code.

O app fala com o Atlas pelo mesmo canal cifrado da Alexa (ntfy.sh). **Não há nenhuma chave nestes arquivos**:
a chave fica só no notebook e no celular, depois do pareamento.

## Publicar (uma vez) no GitHub Pages
1. github.com → New repository → nome `atlas-mobile` → Public → Create.
2. Add file → Upload files → arraste todos os arquivos desta pasta → Commit.
3. Settings → Pages → Branch `main`, pasta `/ (root)` → Save. Em 1–2 minutos o endereço aparece
   (algo como `https://SEU-USUARIO.github.io/atlas-mobile/`).

## Parear o celular
1. No notebook, rode `Parear_Celular.bat` (pasta do Atlas). Na primeira vez ele pergunta o endereço do app.
2. No celular chega uma notificação do ntfy: toque nela → o app abre já ligado ao Atlas.
   (Ou copie o código que aparece na tela e cole no app.)
3. Instale: Chrome (Android) → menu ⋮ → Instalar app. Safari (iPhone) → Compartilhar → Adicionar à Tela de Início.

## Ligação direta (Tailscale) — recomendado
O ntfy.sh gratuito tem cota diária de mensagens por IP. Com o Tailscale, o app fala direto com o notebook, sem limite:
1. Notebook: instale o Tailscale (tailscale.com/download) e entre com sua conta.
2. Rode `Ativar_Tailscale.bat` na pasta do Atlas. Ele publica só o canal do app (`/api/movel`) na sua rede Tailscale, com HTTPS,
   e mostra o endereço do notebook (ex.: `notebook.tailXXXX.ts.net`). Reinicie o Atlas.
3. iPhone: instale o app Tailscale, entre com a MESMA conta e deixe ligado.
4. No Atlas: Ajustes → Ligação direta → cole o endereço → Salvar. O topo mostra `NOTEBOOK ONLINE · DIRETO`.
Sem o Tailscale ligado, o app usa o ntfy como reserva, sozinho.

## Notificações na tela de bloqueio
1. No notebook, rode `Ativar_Notificacoes.bat` (uma vez) e reinicie o Atlas.
2. No iPhone, abra o Atlas pelo ícone da Tela de Início → Ajustes → Notificações → Permitir.
Avisa só com o app fechado: resposta que demorou, confirmação pedida, sessão do Claude que terminou ou pediu permissão.

## Atualizar (quando você editar algo)
1. No GitHub: Add file → Upload files → arraste os arquivos alterados (normalmente só `index.html`, às vezes `sw.js`) → Commit.
2. Em 1–2 minutos o app percebe sozinho: ao abrir, ao voltar para ele e a cada 10 min.
   O botão ⟳ no topo fica âmbar e aparece a faixa **NOVA VERSÃO DO APP** → toque em **Atualizar**.
3. Para forçar a qualquer momento: toque no ⟳ (diz se já está na mais nova) ou Ajustes → **Atualizar o app**.
A conversa e o pareamento continuam; não precisa parear de novo.
