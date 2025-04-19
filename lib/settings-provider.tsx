"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"

interface SettingsContextType {
  settings: Record<string, string>
  isLoading: boolean
  error: string | null
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  isLoading: true,
  error: null,
})

export function useSettings() {
  return useContext(SettingsContext)
}

interface SettingsProviderProps {
  children: ReactNode
  initialSettings?: Record<string, string>
}

export function SettingsProvider({ children, initialSettings = {} }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings)
  const [isLoading, setIsLoading] = useState(!Object.keys(initialSettings).length)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (Object.keys(initialSettings).length) {
      setSettings(initialSettings)
      setIsLoading(false)
      return
    }

    async function fetchSettings() {
      try {
        const response = await fetch("/api/settings")
        if (!response.ok) {
          throw new Error("Failed to fetch settings")
        }
        const data = await response.json()
        setSettings(data)
      } catch (err) {
        console.error("Error fetching settings:", err)
        setError("Failed to load site settings")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [initialSettings])

  return <SettingsContext.Provider value={{ settings, isLoading, error }}>{children}</SettingsContext.Provider>
}
