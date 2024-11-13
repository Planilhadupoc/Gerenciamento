import pandas as pd
import streamlit as st
from datetime import datetime

# Função para carregar histórico (se existir)
def load_data():
    try:
        return pd.read_csv("data.csv")
    except FileNotFoundError:
        return pd.DataFrame(columns=["Data", "Banca", "Resultado", "Meta", "Stop"])

# Função para salvar histórico
def save_data(df):
    df.to_csv("data.csv", index=False)

# Função para calcular meta e stop loss
def calcular_meta_stop(banca):
    meta = banca * 0.15
    stop = banca * 0.10
    return meta, stop

# Configuração da página
st.title("Gerenciamento de Banca")
st.sidebar.header("Configurações")

# Carregar dados
dados = load_data()

# Pegar o valor da banca atual
banca_atual = float(dados["Banca"].iloc[-1]) if not dados.empty else 1000.0  # Valor inicial padrão

# Mostrar banca atual
st.subheader(f"Banca Atual: R$ {banca_atual:.2f}")

# Calcular meta e stop loss
meta, stop = calcular_meta_stop(banca_atual)
st.write(f"Meta do Dia (15%): R$ {meta:.2f}")
st.write(f"Stop Loss do Dia (10%): R$ {stop:.2f}")

# Entrada de resultado do dia
st.subheader("Inserir Resultado do Dia")
resultado = st.number_input("Resultado do dia (positivo ou negativo):", value=0.0, step=0.01)

if st.button("Atualizar Banca"):
    # Atualizar banca com base no resultado
    nova_banca = banca_atual + resultado

    # Registrar no histórico
    novo_registro = {
        "Data": datetime.now().strftime("%Y-%m-%d"),
        "Banca": nova_banca,
        "Resultado": resultado,
        "Meta": meta,
        "Stop": stop
    }
    dados = dados.append(novo_registro, ignore_index=True)
    save_data(dados)

    st.success("Banca atualizada com sucesso!")
    st.experimental_rerun()

# Exibir histórico
st.subheader("Histórico de Operações")
st.dataframe(dados)
