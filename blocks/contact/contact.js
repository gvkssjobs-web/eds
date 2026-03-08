function getCellText(cell) {
  const p = cell.querySelector('p');
  return (p || cell).textContent.trim();
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')].filter((row) => row.children.length > 0);
  if (rows.length === 0) return;

  const table = document.createElement('table');
  table.classList.add('contact-table');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.classList.add('contact-table-header');
  [...rows[0].children].forEach((cell) => {
    const th = document.createElement('th');
    th.textContent = getCellText(cell);
    th.scope = 'col';
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (let i = 1; i < rows.length; i += 1) {
    const tr = document.createElement('tr');
    tr.classList.add('contact-table-row');
    const cells = [...rows[i].children];
    cells.forEach((cell, index) => {
      const td = document.createElement('td');
      const content = getCellText(cell);
      if (index === 1 && content) {
        const link = document.createElement('a');
        link.href = `mailto:${content}`;
        link.textContent = content;
        td.appendChild(link);
      } else if (index === 2 && content) {
        const link = document.createElement('a');
        link.href = `tel:${content}`;
        link.textContent = content;
        td.appendChild(link);
      } else {
        td.textContent = content || '—';
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  const wrapper = document.createElement('div');
  wrapper.classList.add('contact-table-wrapper');
  wrapper.appendChild(table);
  block.innerHTML = '';
  block.appendChild(wrapper);
}
