// Taulukko tummille ohjesivuille (/talvisailytys, /kutistepussi-vai-pressu). Oikea HTML-taulukko,
// jotta hakukoneet ja tekoälyt lukevat sen; kapealla näytöllä taulukkoa voi vierittää sivusuunnassa.
// Ensimmäinen sarake on rivin otsikko (th scope="row").
export function GuideTable({headers, rows}: {headers: string[]; rows: string[][]}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-relaxed md:text-base">
        <thead>
          <tr className="border-b border-white/30">
            {headers.map((header, i) =>
              header ? (
                <th key={i} scope="col" className="py-3 pr-4 align-bottom font-semibold text-white">
                  {header}
                </th>
              ) : (
                <td key={i} className="py-3 pr-4" />
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/15">
          {rows.map(([first, ...cells]) => (
            <tr key={first}>
              <th scope="row" className="py-3 pr-4 align-top font-medium text-white">
                {first}
              </th>
              {cells.map((cell, i) => (
                <td key={i} className="py-3 pr-4 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
