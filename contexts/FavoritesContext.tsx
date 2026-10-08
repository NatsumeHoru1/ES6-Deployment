"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthContext";

type FavoriteAction =
  | { type: "SET"; payload: number[] }
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number };

function favoritesReducer(state: number[], action: FavoriteAction): number[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return state.includes(action.payload) ? state : [...state, action.payload];
    case "REMOVE":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;

    async function loadFavorites() {
      if (user) {
        const { data, error } = await supabase
          .from("favorites")
          .select("product_id");

        if (error) {
          console.error("Error loading favorites:", error);
          return;
        }

        if (mounted && data) {
          dispatch({ type: "SET", payload: data.map((row) => row.product_id) });
        }
      } else {
        if (mounted) {
          dispatch({ type: "SET", payload: [] });
        }
      }
    }

    loadFavorites();

    return () => {
      mounted = false;
    };
  }, [user]);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggleFavorite = async (id: number) => {
    if (!user) return; // Should not happen as button redirects, but safe guard

    const currentlyFavorite = isFavorite(id);

    // Optimistic update
    if (currentlyFavorite) {
      dispatch({ type: "REMOVE", payload: id });
      const { error } = await supabase
        .from("favorites")
        .delete()
        .match({ user_id: user.id, product_id: id });
      
      if (error) {
        console.error("Error removing favorite:", error);
        // Rollback
        dispatch({ type: "ADD", payload: id });
      }
    } else {
      dispatch({ type: "ADD", payload: id });
      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, product_id: id });
      
      if (error) {
        console.error("Error adding favorite:", error);
        // Rollback
        dispatch({ type: "REMOVE", payload: id });
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
