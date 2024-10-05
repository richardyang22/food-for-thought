import { useLocation } from 'react-router-dom'

export function ResultsPage() {
    const { image } = useLocation().state;
    return (
        <div>
            <img src={URL.createObjectURL(image)} />
        </div>
    );
}
