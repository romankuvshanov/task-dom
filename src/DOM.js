/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    const body = document.querySelector('body');
    for (let i = 0; i < count; i++) {
        const domElement = document.createElement(tag);
        domElement.innerHTML = content;
        body.append(domElement);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    const rootDiv = document.createElement('div');
    rootDiv.classList.add(`item_${1}`);

    function populateElementRecursive(element, childrenCount, level, levelMax) {
        for (let i = 0; i < childrenCount; i++) {
            const elemDiv = document.createElement('div');
            elemDiv.classList.add(`item_${levelMax - level + 1}`);
            element.append(elemDiv);
        }
        if (level - 1 > 0) {
            for (let child of element.children) {
                populateElementRecursive(
                    child,
                    childrenCount,
                    level - 1,
                    levelMax,
                );
            }
        }
    }

    populateElementRecursive(rootDiv, childrenCount, level - 1, level);
    return rootDiv;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);
    for (let child of tree.children) {
        child.outerHTML = child.outerHTML.replace('div', 'section');
    }
    return tree;
}
