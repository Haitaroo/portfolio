import React, { useEffect, useState } from 'react';
import './GithubProgress.css';

const GithubProgress = ({ username }) => {
  const [contributions, setContributions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Remplacez par une API GitHub appropriée ou utilisez une bibliothèque de contributions
    const fetchContributions = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données GitHub');
        }
        const data = await response.json();
        setContributions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContributions();
  }, [username]);

  if (error) {
    return <div className="github-error">Erreur : {error}</div>;
  }

  if (!contributions) {
    return <div className="github-loading">Chargement des contributions...</div>;
  }

  return (
    <div className="github-progress">
      <h3>Mes projets :</h3>
      <div className="project-list">
        {contributions.map((repo) => (
          <div className="project-card" key={repo.id}>
            <img src={`https://raw.githubusercontent.com/${username}/${repo.name}/main/screenshot.png`} alt={repo.name} className="project-image" />
            <div className="project-info">
              <h4>{repo.name}</h4>
              <p>{repo.description || 'Aucune description disponible.'}</p>
              <div className="project-buttons">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn-view-code">Voir le code</a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="btn-view-site">Voir le site</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubProgress;