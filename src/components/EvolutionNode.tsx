import type { Evolution } from "@/types/evolution";

interface EvolutionNodeProps {
  evolution: Evolution;
  onSelect: (speciesUrl: string) => void;
}

export default function EvolutionNode({ evolution, onSelect }: EvolutionNodeProps) {
    return (
        <li className="evolution-node">
            <button className="evolution-button" type="button" onClick={() => onSelect(evolution.species.url)}>
                {evolution.species.name}
            </button>
            {evolution.evolves_to.length > 0 && (
                <ul>
                    {evolution.evolves_to.map((child) => (
                        <EvolutionNode
                            key={child.species.url}
                            evolution={child}
                            onSelect={onSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}