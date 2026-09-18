import { useEffect, useState } from "react";
import { getEvolutionChain, getSpecies } from '@/services/evolution';
import type { Evolution } from '@/types/evolution';
import EvolutionNode from './EvolutionNode';

interface EvolutionChainProps {
  speciesUrl: string;
  onSelect: (name: string) => void;
}

type ChainState = 
| { status: 'loading' }
| { status: 'error'; message: string }
| { status: 'success'; chain: Evolution | null };

export default function EvolutionChain({ speciesUrl, onSelect }: EvolutionChainProps) {
    const [state, setState] = useState<ChainState>({ status: 'loading' });
    const [selectedUrl, setSelectedUrl] = useState<{ url: string } | null>(null);
    const [selectionError, setSelectionError] = useState<string | null>(null);
    const [selecting, setSelecting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        let obsolete = false;

        getEvolutionChain(speciesUrl, controller.signal)
            .then((chain) => {
                if (!obsolete) setState({ status: 'success', chain });
            })
            .catch((error: unknown) => {
                if (!obsolete) {
                    setState({ 
                        status: 'error',
                        message: (error instanceof Error) ? error.message : 'Evolution indisponible', 
                    });
                }
            })
            
        return () => {
            obsolete = true;
            controller.abort();
        };
    }, [speciesUrl]);

    useEffect(() => {
        if (!selectedUrl) return;
        const controller = new AbortController();
        let obsolete = false;

        getSpecies(selectedUrl.url, controller.signal)
            .then((species) => {
                if (obsolete) return;
                const variety = species.varieties.find((item)=>
                item.is_default)
                if (!variety) throw new Error('Aucune forme par défaut disponible.')
                onSelect(variety.pokemon.name)
            })
            .catch((error: unknown) => {
                if (!obsolete) {
                    setSelectionError(error instanceof Error ? error.message : 'Sélection impossible')
                }
            })
            .finally(() => {
                if (!obsolete) setSelecting(false)
            })

            return () => {
                obsolete = true
                controller.abort()
            }
    }, [selectedUrl, onSelect])

    return (
        <section aria-label="Famille d'évolution">
            <h2>Famille d'évolution</h2>
            {state.status === 'loading' && (
                <p role="status">Chargement des évolutions...</p>
            )}
            {state.status === 'error' && <p role='alert'>{state.message}</p>}
            {selecting && <p role="status">Chargement de l'espèce sélectionnée...</p>}
            {selectionError && <p role="alert">{selectionError}</p>}
            {state.status === 'success' && (
                state.chain ? (
                    <>
                        {state.chain.evolves_to.length === 0 && <p>Cette famille n'a pas d'évolution</p>}
                        <ul>
                            <EvolutionNode
                            evolution={state.chain}
                            onSelect={(url) => {
                                setSelectionError(null)
                                setSelecting(true)
                                setSelectedUrl({ url })
                            }}
                        />
                        </ul>
                    </>
                ) : <p>Aucune chaine d'évolution disponible.</p>
            )}
        </section>
    )
}
