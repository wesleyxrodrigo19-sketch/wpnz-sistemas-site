from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "marketing-videos"
TEXT = OUT / "_text"
ASSETS = ROOT / "dist" / "assets"
FFMPEG = shutil.which("ffmpeg") or "ffmpeg"

W, H, FPS, DURATION = 1080, 1920, 30, 38
FONT_BOLD = "C\\:/Windows/Fonts/arialbd.ttf"
FONT_REGULAR = "C\\:/Windows/Fonts/arial.ttf"

CAMPAIGNS = [
    {
        "slug": "01-acaiteria", "icon": 1, "label": "AÇAITERIA E SORVETERIA",
        "scenes": [
            ("VENDA MAIS", "Sua açaiteria\npode vender mais.", "Balança, PDV e atendimento conectados."),
            ("TUDO EM UMA FILA", "Peso, balcão, delivery\ne mesas.", "Chega de redigitar pedidos e perder tempo."),
            ("BALANÇA INTEGRADA", "O peso entra\ndireto no PDV.", "Preço por quilo calculado com agilidade."),
            ("OPERAÇÃO CONECTADA", "PedeAI + impressão\nautomática.", "Cada pedido chega ao setor certo."),
            ("FEITO PARA VOCÊ", "100% personalizado\nà sua operação.", "Visual, fluxo, módulos e regras do seu jeito."),
        ],
    },
    {
        "slug": "02-bar-restaurante", "icon": 2, "label": "BAR E RESTAURANTE",
        "scenes": [
            ("SALÃO SOB CONTROLE", "Seu salão\nsem papel.", "Mais velocidade para atender e fechar contas."),
            ("CONTROLE POR GARÇOM", "Pedido lançado\ndireto na mesa.", "Atendente, horário e itens sempre registrados."),
            ("COMANDA AUTOMÁTICA", "O pedido sai\nna impressora.", "Bar e cozinha recebem apenas o que produzem."),
            ("TUDO CONECTADO", "Mesas + delivery\n+ caixa.", "Uma operação contínua do pedido ao fechamento."),
            ("DO SEU JEITO", "100% personalizado\npara seu negócio.", "Telas, permissões e fluxo conforme sua rotina."),
        ],
    },
    {
        "slug": "03-hamburgueria", "icon": 3, "label": "HAMBURGUERIA E LANCHONETE",
        "scenes": [
            ("PRODUÇÃO ÁGIL", "Mais pedidos.\nMenos retrabalho.", "Do clique do cliente direto para a chapa."),
            ("CARDÁPIO INTELIGENTE", "Adicionais, combos\ne ponto da carne.", "Montagem clara para o cliente e a cozinha."),
            ("TODOS OS CANAIS", "Delivery, retirada,\nbalcão e salão.", "Uma única fila com o canal identificado."),
            ("SEM REDIGITAR", "A chapa recebe\no pedido completo.", "Observações e impressão por setor."),
            ("SUA OPERAÇÃO", "100% personalizado\npara sua marca.", "Cardápio, cores, regras e integrações."),
        ],
    },
    {
        "slug": "04-pizzaria", "icon": 4, "label": "PIZZARIA",
        "scenes": [
            ("PEDIDO SEM ERRO", "Meio a meio.\nControle por inteiro.", "Uma experiência simples para vender mais."),
            ("MONTAGEM GUIADA", "Tamanhos, sabores,\nbordas e adicionais.", "O cliente monta e a cozinha entende."),
            ("FLUXO SINCRONIZADO", "Caixa e cozinha\ntrabalham juntos.", "Impressão automática em cada setor."),
            ("MENOS LIGAÇÕES", "Cliente acompanha\no pedido online.", "Status claro da confirmação à entrega."),
            ("SUA PIZZARIA", "100% personalizada\nao seu jeito.", "Preços, regras, identidade e operação."),
        ],
    },
    {
        "slug": "05-marmitaria", "icon": 5, "label": "MARMITARIA E ALMOÇO DELIVERY",
        "scenes": [
            ("PICO ORGANIZADO", "Domine o pico\ndo almoço.", "Mais previsibilidade para produzir e entregar."),
            ("CARDÁPIO DO DIA", "Pedidos agendados\nsem confusão.", "Tamanhos, opções e horários bem definidos."),
            ("PRODUÇÃO EM LOTE", "Saiba quanto\nprecisa montar.", "Contagem por prato, tamanho e horário."),
            ("ENTREGAS NO PRAZO", "Rotas organizadas\npor região.", "Pedidos agrupados para ganhar velocidade."),
            ("FEITO PARA VOCÊ", "100% personalizado\nà sua demanda.", "Do cardápio às regras de entrega."),
        ],
    },
    {
        "slug": "06-espetaria", "icon": 6, "label": "ESPETARIA E CHURRASCARIA",
        "scenes": [
            ("SALÃO ORGANIZADO", "Cada rodada\nno setor certo.", "Agilidade para atender mesas cheias."),
            ("COMANDA DIGITAL", "Pedidos por mesa\ne por garçom.", "Novos itens entram na mesma comanda."),
            ("PRODUÇÃO SEPARADA", "Bar e churrasqueira\nsem confusão.", "Cada estação recebe apenas seus itens."),
            ("FECHAMENTO FÁCIL", "Conta dividida\ne taxa de serviço.", "Pagamento por pessoa, item ou valor."),
            ("DO SEU JEITO", "100% personalizado\npara sua rotina.", "Cardápio, setores, permissões e relatórios."),
        ],
    },
    {
        "slug": "07-cafeteria", "icon": 7, "label": "CAFETERIA, PADARIA E CONFEITARIA",
        "scenes": [
            ("BALCÃO QUE GIRA", "Atendimento rápido.\nReceita padronizada.", "Mais organização do pedido à retirada."),
            ("VENDA INTELIGENTE", "Senhas, combos\ne variações.", "Uma fila clara para balcão e produção."),
            ("CUSTO SOB CONTROLE", "Ficha técnica,\nlotes e validade.", "Baixa de insumos e visão das margens."),
            ("ENCOMENDAS", "Data, horário\ne sinal registrados.", "Produção planejada e retirada sem surpresa."),
            ("SUA IDENTIDADE", "100% personalizado\npara sua marca.", "Cores, produtos, telas e processos."),
        ],
    },
    {
        "slug": "08-sushi", "icon": 8, "label": "SUSHI E CULINÁRIA ORIENTAL",
        "scenes": [
            ("MONTAGEM SEM ERRO", "Peças certas.\nSequência certa.", "Pedidos claros para ganhar velocidade."),
            ("COMBOS CONFIGURÁVEIS", "Trocas e limites\nbem definidos.", "O cliente monta sem quebrar sua regra."),
            ("ESTAÇÕES ORGANIZADAS", "Filas fria e quente\nsem confusão.", "Cada setor recebe os itens corretos."),
            ("DELIVERY COMPLETO", "Taxa por bairro\ne rastreio.", "Cliente acompanha o pedido pelo celular."),
            ("DO SEU JEITO", "100% personalizado\npara seu cardápio.", "Combos, regras, identidade e operação."),
        ],
    },
    {
        "slug": "09-wpnz-completo", "icon": 0, "label": "WPNZ SISTEMAS",
        "scenes": [
            ("DO PEDIDO À GESTÃO", "Um sistema.\nToda a operação.", "Tecnologia feita para o seu negócio."),
            ("TODOS OS CANAIS", "PDV + delivery\n+ mesas + balcão.", "Pedidos centralizados em uma única fila."),
            ("INTEGRAÇÕES", "Balança, impressão,\nPedeAI e fiscal.", "Conecte equipamentos e plataformas."),
            ("GESTÃO COMPLETA", "Estoque, relatórios\ne permissões.", "Decisões com dados claros e segurança."),
            ("MUITOS NICHOS", "8 nichos.\n100% personalizado.", "Seu gosto, suas demandas e suas necessidades."),
        ],
    },
]


def safe_text_path(slug: str, scene: int, kind: str) -> Path:
    return TEXT / f"{slug}-{scene}-{kind}.txt"


def write_text(path: Path, value: str) -> str:
    path.write_text(value, encoding="utf-8")
    return path.relative_to(ROOT).as_posix().replace("'", "\\'")


def dt(textfile: str, size: int, color: str, y: int, start: float, end: float,
       font: str = FONT_BOLD, line_spacing: int = 12) -> str:
    return (
        f"drawtext=fontfile='{font}':textfile='{textfile}':fontsize={size}:"
        f"fontcolor={color}:line_spacing={line_spacing}:text_align=C:expansion=none:"
        f"x=(w-text_w)/2:y={y}:enable='between(t,{start},{end})'"
    )


def make_filter(campaign: dict) -> str:
    icon_index = campaign["icon"]
    if icon_index == 0:
        icon_chain = "[1:v]scale=860:430,format=rgba,colorchannelmixer=aa=0.96[icon]"
        icon_y = "145+8*sin(t*1.1)"
    else:
        col = (icon_index - 1) % 4
        row = (icon_index - 1) // 4
        icon_chain = (
            f"[1:v]crop=iw/4:ih/2:iw/4*{col}:ih/2*{row},"
            "scale=360:360,format=rgba,colorchannelmixer=aa=0.98[icon]"
        )
        icon_y = "145+10*sin(t*1.2)"

    chain = [
        icon_chain,
        "[2:v]scale=320:-1,format=rgba[brand]",
        "[0:v]format=yuv420p,"
        "drawgrid=width=90:height=90:thickness=1:color=0x43d8ce@0.055,"
        "drawbox=x=-170+mod(t*58\\,1420):y=80:w=420:h=420:color=0x24c9c2@0.07:t=fill,"
        "drawbox=x=860-mod(t*42\\,1320):y=1280:w=520:h=520:color=0xd4ff53@0.045:t=fill,"
        "drawbox=x=0:y=0:w=1080:h=18:color=0xd4ff53:t=fill,"
        "drawbox=x=0:y=1888:w='1080*t/38':h=32:color=0x5ce7d4:t=fill[bg]",
        f"[bg][icon]overlay=x='(W-w)/2':y='{icon_y}':enable='between(t,0,29.99)'[v1]",
        "[v1][brand]overlay=x='(W-w)/2':y=135:enable='between(t,30,38)'[v2]",
    ]

    scene_ranges = [(0, 5.6), (5.6, 11.6), (11.6, 17.8), (17.8, 24.0), (24.0, 30.0)]
    filters = []
    label_file = write_text(safe_text_path(campaign["slug"], 0, "label"), campaign["label"])
    for index, ((kicker, headline, body), (start, end)) in enumerate(zip(campaign["scenes"], scene_ranges), 1):
        kicker_file = write_text(safe_text_path(campaign["slug"], index, "kicker"), kicker)
        headline_file = write_text(safe_text_path(campaign["slug"], index, "headline"), headline)
        body_file = write_text(safe_text_path(campaign["slug"], index, "body"), body)
        filters += [
            f"drawbox=x=80:y=560:w=920:h=730:color=0x0b282a@0.88:t=fill:enable='between(t,{start},{end})'",
            dt(label_file, 30, "0x70ead7", 545, start, end, line_spacing=8),
            dt(kicker_file, 31, "0xd4ff53", 630, start, end, line_spacing=8),
            dt(headline_file, 72, "white", 735, start, end, line_spacing=12),
            dt(body_file, 34, "0xc4d7d5", 1055, start, end, FONT_REGULAR, 10),
            dt(write_text(safe_text_path(campaign["slug"], index, "number"), f"0{index}"), 25, "0x69e8d5", 1235, start, end),
        ]

    final_texts = [
        ("SISTEMA 100% PERSONALIZADO", 38, "0x69e8d5", 515),
        ("PDV COMPLETO", 34, "white", 645),
        ("R$ 200 / MÊS", 70, "0xd4ff53", 700),
        ("PDV COMPLETO + MÓDULO FISCAL", 29, "white", 840),
        ("R$ 250 / MÊS", 70, "0xd4ff53", 895),
        ("5% POR INDICAÇÃO  •  ATÉ 25%", 31, "0x69e8d5", 1060),
        ("WESLEY RODRIGO", 33, "white", 1270),
        ("(87) 9 9212-7258", 60, "white", 1330),
        ("wr.wpnz.com.br", 34, "0xd4ff53", 1430),
        ("Módulo fiscal sujeito às condições de implantação.", 23, "0x8fa8a7", 1575),
    ]
    filters += [
        "drawbox=x=58:y=455:w=964:h=1180:color=0x0b282a@0.94:t=fill:enable='between(t,30,38)'",
        "drawbox=x=102:y=670:w=876:h=118:color=0x143b3c@0.95:t=fill:enable='between(t,30,38)'",
        "drawbox=x=102:y=865:w=876:h=118:color=0x143b3c@0.95:t=fill:enable='between(t,30,38)'",
    ]
    for i, (value, size, color, y) in enumerate(final_texts):
        fpath = write_text(safe_text_path(campaign["slug"], 90 + i, "final"), value)
        filters.append(dt(fpath, size, color, y, 30, 38, FONT_BOLD if i != 9 else FONT_REGULAR, 8))

    filters += [
        "fade=t=in:st=0:d=0.5,fade=t=out:st=37.3:d=0.7[v]",
    ]
    chain.append("[v2]" + ",".join(filters))
    return ";".join(chain)


def generate(campaign: dict) -> Path:
    output = OUT / f"{campaign['slug']}-vertical-38s.mp4"
    filter_complex = make_filter(campaign)
    audio = (
        "aevalsrc='0.030*sin(2*PI*110*t)+0.018*sin(2*PI*165*t)+"
        "0.014*sin(2*PI*220*t)':s=48000:d=38"
    )
    cmd = [
        FFMPEG, "-y", "-hide_banner", "-loglevel", "error", "-nostats",
        "-f", "lavfi", "-i", f"color=c=0x061a1c:s={W}x{H}:r={FPS}:d={DURATION}",
        "-loop", "1", "-i", str(ASSETS / "niche-emblems.png"),
        "-loop", "1", "-i", str(ASSETS / "wpnz-logo.jpeg"),
        "-f", "lavfi", "-i", audio,
        "-filter_complex", filter_complex,
        "-map", "[v]", "-map", "3:a",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "21",
        "-pix_fmt", "yuv420p", "-r", str(FPS),
        "-c:a", "aac", "-b:a", "160k",
        "-af", "tremolo=f=2:d=0.55,afade=t=in:d=1,afade=t=out:st=36:d=2,volume=0.7",
        "-movflags", "+faststart", "-t", str(DURATION), str(output),
    ]
    print(f"GERANDO {campaign['slug']}...", flush=True)
    subprocess.run(cmd, cwd=ROOT, check=True)
    print(f"OK {output.name}", flush=True)
    return output


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="Gera apenas o slug informado")
    args = parser.parse_args()
    OUT.mkdir(exist_ok=True)
    TEXT.mkdir(exist_ok=True)
    selected = [c for c in CAMPAIGNS if not args.only or c["slug"] == args.only]
    if not selected:
        raise SystemExit(f"Slug não encontrado: {args.only}")
    outputs = [generate(c) for c in selected]
    manifest = {
        "format": "MP4 H.264/AAC",
        "dimensions": f"{W}x{H}",
        "fps": FPS,
        "duration_seconds": DURATION,
        "files": [p.name for p in outputs],
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print("CAMPANHA CONCLUÍDA", flush=True)


if __name__ == "__main__":
    main()
