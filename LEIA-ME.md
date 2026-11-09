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

## Chat por sessão (como no Claude Desktop)
Na aba **Sessões**, toque numa sessão: abre a conversa SÓ dela, com o histórico (seus pedidos e as respostas do Claude, lidos
do notebook) e uma caixa para escrever. O que você manda vai direto para a caixa de mensagem dessa sessão no Claude Desktop
(o Atlas abre a sessão pelo título exato, confere o cabeçalho, cola e envia; se ela estiver trabalhando, entra na fila).
Os avisos do Atlas sobre a sessão (entregue, terminou, pediu permissão) ficam dentro desse chat, não na conversa geral.
Com o canal direto (Tailscale) a conversa se atualiza sozinha; pelo ntfy, toque em ⟳ (para não gastar a cota).

## Modo longe: Permitir / Negar pelo celular sem tocar no notebook
Na aba **Sessões**, ligue **Modo longe** (ou diga "liga o modo longe"). A partir daí, quando uma sessão do Claude Code /
Claude Desktop for pedir permissão, o próprio Claude Code chama o Atlas (hook `PermissionRequest`, instalado pelo
`Configurar_Avisos.bat`): o pedido aparece no chat da sessão no app, com **Permitir / Negar**, e a resposta volta direto
para o Claude Code — nenhum clique, mouse ou teclado no notebook. Sem resposta em 5 min (`longe_espera_s`), o pedido cai na
tela do notebook (nada é aprovado sozinho). Desligado (padrão), os pedidos aparecem normalmente no notebook.
Por voz: "aprova a sessão SG-Tools", "nega o pedido no Claude". Registro: `logs/permissoes.log`.
As mensagens do chat vão por mensagem entre sessões para o título EXATO da sessão (sem mouse). Se a sessão não aparecer
para o Atlas, ele avisa e não envia; com `"entrega_reserva_caixa": true` no `config.json`, digita na caixa dela (mouse).

## Responder permissões das sessões do Claude Desktop (pela tela — reserva, desligada)
Quando uma sessão pede permissão, a aba **Sessões** mostra o card em vermelho com **QUER ›** (o que ela quer fazer, lido do
histórico da sessão) e os botões **Permitir / Negar**. Perguntas com opções aparecem só para leitura (responda no notebook).
O Atlas aciona o botão no Claude Desktop pelo NOME do botão (acessibilidade do Windows, sem mouse). Antes, abre a sessão pela
barra lateral e confere o cabeçalho. Por voz/texto: "aprova a sessão SG-Tools", "nega o pedido no Claude".
Segurança: só clica se a sessão ainda pede exatamente aquilo e se houver um único botão correspondente. Nunca clica em
"sempre" ou "nesta sessão". Registro: `logs/claude_botoes.log`, que também anota os nomes dos botões a cada pedido novo
(para ajustar `claude_botoes_permitir` / `claude_botoes_negar` no `config.json`, se o app usar outros nomes).

## Atualizar (quando você editar algo)
1. No GitHub: Add file → Upload files → arraste os arquivos alterados (normalmente só `index.html`, às vezes `sw.js`) → Commit.
2. Em 1–2 minutos o app percebe sozinho: ao abrir, ao voltar para ele e a cada 10 min.
   O botão ⟳ no topo fica âmbar e aparece a faixa **NOVA VERSÃO DO APP** → toque em **Atualizar**.
3. Para forçar a qualquer momento: toque no ⟳ (diz se já está na mais nova) ou Ajustes → **Atualizar o app**.
A conversa e o pareamento continuam; não precisa parear de novo.
