export const overflowingClass = (node: Element) => {
	const rect = node.getBoundingClientRect();
	const children = node.children;
	//if for any child is overflowing, then the parent is overflowing
	for (let i = 0; i < children.length; i++) {
		const childRect = children[i].getBoundingClientRect();
		if (
			childRect.top < rect.top - 1 ||
			childRect.right > rect.right + 1 ||
			childRect.bottom > rect.bottom + 1 ||
			childRect.left < rect.left - 1
		) {
			node.classList.add('overflowing');
		}
	}
	return {
		destroy: () => {
			node.classList.remove('overflowing');
		}
	};
};
