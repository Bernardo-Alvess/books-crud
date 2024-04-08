export function generateSlug(texto: string): string {
    const textoSemCaracteresEspeciais = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const textoFormatado = textoSemCaracteresEspeciais
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-');
    const textoSemHifensNoInicioEFim = textoFormatado.replace(/^-+|-+$/g, '');
    return textoSemHifensNoInicioEFim;
}