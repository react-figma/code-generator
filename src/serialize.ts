
const availableProps = [
    "width",
    "height",
    "type"
];

export const serialize = (node) => {
    const result = ({} as any);
    availableProps.map((prop) => {
        result[prop] = node[prop];
    });

    if (node.children) {
        result.children = node.children.map(serialize);
    }

    return result;
};
