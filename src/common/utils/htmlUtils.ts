const dynamicNewLineHtml = ' <br class="dynamic-new-line">';

export function insertDynamicNewLines(htmlElement: HTMLElement, wordsInLine: number = 1): void{   
    let newElementText: string;     
    if (wordsInLine === 1){
        newElementText = htmlElement.innerHTML
            .split(' ')
            .join(dynamicNewLineHtml);         
    }
    else{
        let words: string[] = htmlElement.innerHTML.split(' ');
        newElementText = words.reduce((wordsWithNewLines: string[], currentWord: string, wordIndex: number) => {
                                        wordsWithNewLines.push(currentWord);
                                        if ((wordIndex + 1) % wordsInLine === 0){
                                            wordsWithNewLines.push(dynamicNewLineHtml);
                                        }
                                        return wordsWithNewLines;
                                    }, [])
                             .join(' ');
    }
    htmlElement.innerHTML = newElementText;
  
}

export function insertNewLinesAtChar(htmlElement: HTMLElement, seperatingChar: string){
    htmlElement.innerHTML = htmlElement.innerHTML.split(seperatingChar).join(seperatingChar + '<br/>');
}

export function stopEventPropagation(event: Event){
    event.stopPropagation();
}