import { useState } from "react";

type Listing = {
  id: number;
  title: string;
  price: string;
  description: string;
  photo: string;
};

export default function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  function addListing(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !price) return;

    setListings([
      {
        id: Date.now(),
        title,
        price,
        description,
        photo
      },
      ...listings
    ]);

    setTitle("");
    setPrice("");
    setDescription("");
    setPhoto("");
    setShowForm(false);
  }

  function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  const filtered = listings.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #080d19; }
        .app {
          min-height: 100vh;
          background: #080d19;
          color: white;
          font-family: Arial, sans-serif;
          padding-bottom: 40px;
        }
        header {
          background: #111b2e;
          padding: 20px;
          border-bottom: 2px solid #19c878;
        }
        .brand { font-size: 25px; font-weight: 900; }
        .brand span { color: #19d889; }
        .tagline { color: #aab7c9; font-size: 12px; margin-top: 7px; }
        .hero { padding: 35px 20px; text-align: center; }
        .hero h1 { font-size: 30px; margin: 8px 0; }
        .hero h1 span { color: #19d889; }
        .hero p { color: #aab7c9; line-height: 1.6; }
        button {
          border: 0;
          border-radius: 9px;
          padding: 13px 18px;
          font-weight: bold;
          cursor: pointer;
        }
        .primary { background: #19d889; color: #06130d; }
        .secondary { background: #1c2a40; color: white; }
        .search {
          width: 100%;
          padding: 15px;
          border-radius: 9px;
          border: 1px solid #34445c;
          background: #111b2e;
          color: white;
          font-size: 15px;
          margin: 15px 0;
        }
        .section { padding: 15px 20px; }
        .section h2 { font-size: 20px; }
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(145px,1fr));
          gap: 13px;
        }
        .card {
          background: #111b2e;
          border: 1px solid #293952;
          border-radius: 12px;
          overflow: hidden;
        }
        .card img {
          width: 100%;
          height: 135px;
          object-fit: cover;
        }
        .placeholder {
          height: 135px;
          display: grid;
          place-items: center;
          background: #1c2a40;
          font-size: 42px;
        }
        .card-content { padding: 12px; }
        .card h3 { font-size: 15px; margin: 3px 0 8px; }
        .price { color: #19d889; font-weight: bold; }
        .description { color: #aab7c9; font-size: 12px; }
        form {
          background: #111b2e;
          padding: 18px;
          border-radius: 12px;
          border: 1px solid #293952;
        }
        form input, form textarea {
          width: 100%;
          padding: 13px;
          margin: 8px 0 14px;
          border: 1px solid #34445c;
          border-radius: 8px;
          background: #080d19;
          color: white;
          font-size: 15px;
        }
        form label { font-size: 13px; color: #c5d0df; }
        footer {
          text-align: center;
          padding: 30px 15px;
          color: #8392a9;
          font-size: 12px;
        }
      `}</style>

      <header>
        <div className="brand">EFOOT <span>MARKET SN</span></div>
        <div className="tagline">LA MARKETPLACE DES COMPTES eFOOTBALL AU SÉNÉGAL</div>
      </header>

      <div className="hero">
        <div>🇸🇳 LE MARCHÉ DU GAMING AU SÉNÉGAL</div>
        <h1>Achetez et vendez vos comptes <span>eFootball</span></h1>
        <p>La plateforme pour trouver les meilleurs comptes eFootball et publier vos annonces.</p>
        <button className="primary" onClick={() => setShowForm(true)}>
          + Vendre mon compte
        </button>
      </div>

      <div className="section">
        <h2>🔎 Trouver un compte</h2>
        <input
          className="search"
          placeholder="Rechercher un compte..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="section">
          <h2>📸 Publier une annonce</h2>
          <form onSubmit={addListing}>
            <label>Nom du compte</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex : Compte eFootball puissant" />

            <label>Prix en FCFA</label>
            <input required type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Ex : 15000" />

            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Décrivez votre compte..." />

            <label>Photo du compte</label>
            <input type="file" accept="image/*" onChange={uploadPhoto} />

            {photo && <img src={photo} alt="Aperçu" style={{width:"100%",maxHeight:180,objectFit:"contain"}} />}

            <button className="primary" type="submit">Publier l'annonce</button>
            <button className="secondary" type="button" onClick={() => setShowForm(false)}>Annuler</button>
          </form>
        </div>
      )}

      <div className="section">
        <h2>🔥 Comptes disponibles</h2>
        {filtered.length === 0 ? (
          <p style={{color:"#aab7c9"}}>
            Aucun compte publié pour le moment. Soyez le premier vendeur !
          </p>
        ) : (
          <div className="cards">
            {filtered.map(item => (
              <div className="card" key={item.id}>
                {item.photo ? (
                  <img src={item.photo} alt={item.title} />
                ) : (
                  <div className="placeholder">⚽</div>
                )}
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <div className="price">{Number(item.price).toLocaleString("fr-FR")} FCFA</div>
                  <p className="description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer>
        <div className="brand">EFOOT <span>MARKET SN</span></div>
        <p>La passion du football, le marché du gaming.</p>
        © 2026 EFOOT MARKET SN
      </footer>
    </div>
  );
              }
