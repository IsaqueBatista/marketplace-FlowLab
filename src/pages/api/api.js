const imagesCards = [
  '/images/shoes2.svg',
  '/images/shoes3.svg',
  '/images/shoes4.svg',
];

export async function fetchProducts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    
    const products = posts.slice(0, 6).map((post, index) => ({
      id: post.id,
      name: post.title.substring(0, 30),
      category: ['Botas', 'Chinelos', 'Chuteiras', 'Sandálias', 'Sapatênis', 'Tênis', 'Tênis de corrida'][Math.floor(Math.random() * 7)],
      image: imagesCards[index % imagesCards.length],
      originalPrice: Math.floor(Math.random() * 500) + 100,
      discount: 10,
      description: post.body
    })).map(product => ({
      ...product,
      currentPrice: Math.round(product.originalPrice * (1 - product.discount / 100))
    }));

    return products;
  } catch (error) {
    console.error('Erro ao buscar ou processar produtos:', error);
    return [];
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const post = await response.json();
    
    const product = {
      id: post.id,
      name: post.title.substring(0, 30),
      category: ['Botas', 'Chinelos', 'Chuteiras', 'Sandálias', 'Sapatênis', 'Tênis', 'Tênis de corrida'][Math.floor(Math.random() * 7)],
      image: imagesCards[(post.id - 1) % imagesCards.length],
      originalPrice: Math.floor(Math.random() * 500) + 100,
      discount: 10,
      description: post.body
    };

    return {
      ...product,
      currentPrice: Math.round(product.originalPrice * (1 - product.discount / 100))
    };
  } catch (error) {
    console.error('Erro ao buscar ou processar produto:', error);
    return null;
  }
}