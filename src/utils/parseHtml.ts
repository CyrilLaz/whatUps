export default function parseHtml(srt: string): string {
    const regExpDiv = /(<div>)/gi;
    const regExpDivS = /(<\/div>)|(<br>)/gi;
    // const regExpBr = / (<br>)/gi;
    return srt.replace(regExpDiv,'\n').replace(regExpDivS,'');
}