<script>
    import { onMount } from "svelte";
    import io from "socket.io-client";

    let prices = { apple: [], android: [] }; // Inicialización de precios
    let socket;

    onMount(() => {
        socket = io("http://localhost:3000");

        socket.on("priceUpdate", (data) => {
            console.log("data:", data);
            const parsedData = JSON.parse(data);

            // Ordenar precios de menor a mayor
            prices = {
                apple: parsedData.apple.sort((a, b) => a.price - b.price),
                android: parsedData.android.sort((a, b) => a.price - b.price),
            };
        });

        return () => {
            // Desconectar el socket al destruir el componente
            socket.disconnect();
        };
    });
</script>

<style>
    main {
        font-family: 'Arial', sans-serif;
        padding: 2rem;
        background-color: #f1f1f1;
        color: #333;
        max-width: 100%;
        margin: auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 2rem;
        color: #2c3e50;
    }

    .section {
        margin-bottom: 2rem;
        border-radius: 12px;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
    }

    .apple-section h2 {
        color: #1e90ff;
        border-bottom: 2px solid #1e90ff;
    }

    .android-section h2 {
        color: #28a745;
        border-bottom: 2px solid #28a745;
    }

    .prices-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .prices-list li {
        font-size: 1rem;
        margin: 0.5rem 0;
        padding: 0.5rem;
        background-color: #f8f9fa;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.3s;
    }

    .prices-list li:hover {
        background-color: #e9ecef;
    }

    .prices-list li span {
        font-weight: bold;
        color: #2c3e50;
    }

    .icon {
        margin-right: 0.5rem;
    }

    @media (max-width: 600px) {
        h1 {
            font-size: 2rem;
        }

        h2 {
            font-size: 1.4rem;
        }

        .prices-list li {
            font-size: 0.9rem;
        }
    }
</style>

<main>
    <h1>Precios de Celulares</h1>

    <div class="section apple-section">
        <h2>📱 Apple</h2>
        <ul class="prices-list">
            {#each prices.apple as item}
                <li>
                    <span>{item.model}</span> 
                    <span>CLP {item.price.toLocaleString()}</span>
                </li>
            {/each}
        </ul>
    </div>

    <div class="section android-section">
        <h2>🤖 Android</h2>
        <ul class="prices-list">
            {#each prices.android as item}
                <li>
                    <span>{item.model}</span> 
                    <span>CLP {item.price.toLocaleString()}</span>
                </li>
            {/each}
        </ul>
    </div>
</main>
