import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Lock,
  Heart,
  MessageSquare,
  ThumbsUp,
  Users,
  Flower,
  Eye,
  EyeOff,
  Star,
  MapPin,
  Send,
  MoreVertical,
} from "lucide-react";

interface Post {
  id: string;
  author: string;
  authorColor: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: "story" | "support" | "resource";
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  authorColor: string;
  content: string;
  timestamp: string;
}

export default function Community() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockPattern, setUnlockPattern] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Mulher Forte #8472",
      authorColor: "bg-purple-500",
      content:
        "Hoje faz 6 meses que saí de um relacionamento de 5 anos de abuso psicológico. Quero dizer para quem está passando por isso: você no está sozinha e é possível recomeçar. Hoje eu tenho paz.",
      timestamp: "2h atrás",
      likes: 127,
      comments: 23,
      category: "story",
    },
    {
      id: "2",
      author: "Guerreira #2341",
      authorColor: "bg-pink-500",
      content:
        "Alguém aqui já conseguiu medida protetiva? Preciso de orientação sobre os documentos necessários. Meu ex não está respeitando o acordo de distância.",
      timestamp: "4h atrás",
      likes: 45,
      comments: 18,
      category: "support",
    },
    {
      id: "3",
      author: "Esperança #5629",
      authorColor: "bg-indigo-500",
      content:
        "Indico a psicóloga Dra. Ana Paula em São Paulo (SP). Ela é especializada em violência doméstica e atende pelo SUS. Me ajudou muito no processo de cura. 💜",
      timestamp: "1d atrás",
      likes: 89,
      comments: 12,
      category: "resource",
    },
    {
      id: "4",
      author: "Recomeço #9128",
      authorColor: "bg-rose-500",
      content:
        "Para quem está começando a reconhecer os sinais: se ele te isola dos amigos e família, controla suas roupas, seu celular, suas saídas... isso é violência psicológica. Não precisa ter agressão física para ser abuso.",
      timestamp: "2d atrás",
      likes: 203,
      comments: 34,
      category: "support",
    },
  ]);

  const [comments] = useState<Comment[]>([
    {
      id: "1",
      postId: "1",
      author: "Coragem #4521",
      authorColor: "bg-teal-500",
      content:
        "Que lindo seu relato! Você é uma inspiração para todas nós. Parabéns pela coragem! 💪",
      timestamp: "1h atrás",
    },
    {
      id: "2",
      postId: "1",
      author: "Luz #7834",
      authorColor: "bg-amber-500",
      content: "Obrigada por compartilhar. Estou no início desse processo e ler isso me dá esperança.",
      timestamp: "30min atrás",
    },
  ]);

  const handleUnlock = () => {
    // Simple pattern check (in real app, this would be more secure)
    if (unlockPattern.length >= 4) {
      setIsUnlocked(true);
    }
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: `Mulher Forte #${Math.floor(Math.random() * 9999)}`,
        authorColor: "bg-purple-500",
        content: newPostContent,
        timestamp: "Agora",
        likes: 0,
        comments: 0,
        category: "story",
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setShowNewPost(false);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const getCategoryBadge = (category: Post["category"]) => {
    switch (category) {
      case "story":
        return (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            História
          </span>
        );
      case "support":
        return (
          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
            Apoio
          </span>
        );
      case "resource":
        return (
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
            Recurso
          </span>
        );
    }
  };

  if (!isUnlocked) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-yellow-50/30 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-10 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_12px_40px_rgba(251,191,36,0.3)]">
              <Lock className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Espaço Seguro
            </h1>
            <p className="text-sm text-gray-500 mb-10 leading-relaxed">
              Este é um espaço protegido. Configure um padrão secreto para
              acessar a comunidade. Este padrão garante que apenas você possa
              ver o conteúdo.
            </p>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Desenhe ou digite seu padrão secreto
              </label>

              {/* Pattern Grid */}
              <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => setUnlockPattern(unlockPattern + num)}
                    className={`w-16 h-16 rounded-full transition-all shadow-sm ${
                      unlockPattern.includes(num.toString())
                        ? "bg-yellow-500 border-2 border-yellow-600 shadow-[0_4px_12px_rgba(251,191,36,0.3)]"
                        : "bg-white border-2 border-gray-200 hover:border-yellow-400"
                    }`}
                  >
                    {unlockPattern.includes(num.toString()) && (
                      <div className="w-4 h-4 bg-white rounded-full mx-auto"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5, 6].map((dot) => (
                  <div
                    key={dot}
                    className={`w-3 h-3 rounded-full transition-all ${
                      unlockPattern.length >= dot
                        ? "bg-yellow-500 shadow-sm"
                        : "bg-gray-200"
                    }`}
                  ></div>
                ))}
              </div>

              {unlockPattern && (
                <button
                  onClick={() => setUnlockPattern("")}
                  className="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Limpar padrão
                </button>
              )}
            </div>

            <button
              onClick={handleUnlock}
              disabled={unlockPattern.length < 4}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                unlockPattern.length >= 4
                  ? "bg-gradient-to-br from-yellow-500 to-pink-500 text-white hover:shadow-[0_12px_40px_rgba(251,191,36,0.4)]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Acessar Comunidade
            </button>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Flower className="w-4 h-4" />
                <span>Acesso 100% anônimo e criptografado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-yellow-50/30">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="font-bold text-gray-900">
                  Comunidade IAgora
                </h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Flower className="w-3 h-3" />
                  Espaço anônimo e seguro
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsUnlocked(false)}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
                title="Bloquear acesso"
              >
                <Lock className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <div className="bg-gradient-to-br from-yellow-500 to-pink-500 shadow-[0_8px_30px_rgba(251,191,36,0.25)]">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-around text-center">
            <div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Users className="w-4 h-4 text-white" />
                <span className="font-bold text-white text-lg">12.847</span>
              </div>
              <p className="text-xs text-white/90 font-medium">Mulheres</p>
            </div>
            <div className="w-px h-10 bg-white/30"></div>
            <div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Heart className="w-4 h-4 text-white" />
                <span className="font-bold text-white text-lg">45.621</span>
              </div>
              <p className="text-xs text-white/90 font-medium">Apoios</p>
            </div>
            <div className="w-px h-10 bg-white/30"></div>
            <div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Star className="w-4 h-4 text-white" />
                <span className="font-bold text-white text-lg">8.392</span>
              </div>
              <p className="text-xs text-white/90 font-medium">Histórias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* New Post Button */}
        <button
          onClick={() => setShowNewPost(!showNewPost)}
          className="w-full bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-5 text-left hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-sm">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-500 font-medium">
              Compartilhe sua história ou peça apoio...
            </span>
          </div>
        </button>

        {/* New Post Form */}
        {showNewPost && (
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg">Nova Publicação</h3>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-light"
              >
                ✕
              </button>
            </div>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Escreva aqui... Lembre-se: este é um espaço anônimo e seguro. Sua identidade está protegida."
              rows={5}
              className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 flex items-center gap-2 font-medium">
                <EyeOff className="w-4 h-4" />
                Publicação anônima
              </p>
              <button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="bg-gradient-to-br from-yellow-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-[0_8px_24px_rgba(251,191,36,0.3)] disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all"
              >
                Publicar
              </button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button className="px-5 py-2.5 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm">
            Todas
          </button>
          <button className="px-5 py-2.5 bg-yellow-100 rounded-full text-sm font-semibold text-yellow-700 hover:bg-yellow-200 transition-colors whitespace-nowrap shadow-sm">
            Histórias
          </button>
          <button className="px-5 py-2.5 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm">
            Pedidos de Apoio
          </button>
          <button className="px-5 py-2.5 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm">
            Recursos
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-7 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 ${post.authorColor} rounded-2xl flex items-center justify-center shadow-sm`}
                  >
                    <span className="text-white font-bold text-base">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {post.author}
                    </p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getCategoryBadge(post.category)}
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 leading-relaxed mb-5">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-5 border-t border-gray-100">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors group"
                >
                  <Heart className="w-5 h-5 group-hover:fill-pink-600" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button
                  onClick={() =>
                    setSelectedPost(selectedPost === post.id ? null : post.id)
                  }
                  className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
              </div>

              {/* Comments Section */}
              {selectedPost === post.id && (
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                  {comments
                    .filter((c) => c.postId === post.id)
                    .map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div
                          className={`w-10 h-10 ${comment.authorColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}
                        >
                          <span className="text-white font-semibold text-sm">
                            {comment.author.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                          <p className="font-semibold text-gray-900 text-sm mb-2">
                            {comment.author}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {comment.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {comment.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}

                  {/* New Comment Input */}
                  <div className="flex gap-3 mt-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-semibold text-sm">
                        V
                      </span>
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escreva um comentário..."
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      <button className="p-3 bg-yellow-500 text-white rounded-2xl hover:bg-yellow-600 transition-colors shadow-sm">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Community Guidelines */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 mt-10">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-3 text-lg">
            <Flower className="w-6 h-6 text-yellow-600" />
            Diretrizes da Comunidade
          </h3>
          <ul className="text-sm text-gray-600 space-y-3 leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-0.5">•</span>
              <span>
                Respeite o anonimato e a privacidade de todas as participantes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-0.5">•</span>
              <span>Ofereça apoio com empatia e sem julgamentos</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-0.5">•</span>
              <span>Não compartilhe informações pessoais identificáveis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold mt-0.5">•</span>
              <span>
                Denuncie conteúdos inadequados - a IA modera automaticamente
              </span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}