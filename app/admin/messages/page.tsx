"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Mock data for messages
const INITIAL_MESSAGES = [
  {
    id: 1,
    name: "Alexandru Marin",
    email: "alexandru.marin@example.com",
    subject: "Întrebare despre programare",
    message:
      "Bună ziua, aș dori să știu dacă aveți disponibilitate pentru schimb de ulei săptămâna viitoare. Mulțumesc!",
    date: "2025-04-01T10:30:00",
    read: false,
    replied: false,
    replies: [],
  },
  {
    id: 2,
    name: "Elena Popescu",
    email: "elena.popescu@example.com",
    subject: "Documente necesare pentru ITP",
    message:
      "Bună ziua, ce documente trebuie să aduc pentru ITP? Este prima dată când vin la dumneavoastră. Mulțumesc anticipat!",
    date: "2025-04-01T09:15:00",
    read: true,
    replied: true,
    replies: [
      {
        id: 1,
        text: "Bună ziua, pentru ITP aveți nevoie de cartea de identitate a vehiculului, certificatul de înmatriculare, asigurarea RCA valabilă și dovada ultimei inspecții tehnice (dacă este cazul). Vă așteptăm!",
        date: "2025-04-01T10:20:00",
      },
    ],
  },
  {
    id: 3,
    name: "Mihai Ionescu",
    email: "mihai.ionescu@example.com",
    subject: "Verificare frâne",
    message:
      "Bună ziua, vreau să fac o programare pentru verificarea frânelor. Am observat un zgomot ciudat când frânez. Când ați avea disponibilitate?",
    date: "2025-03-31T14:45:00",
    read: true,
    replied: false,
    replies: [],
  },
  {
    id: 4,
    name: "Ana Vasilescu",
    email: "ana.vasilescu@example.com",
    subject: "Preț schimb distribuție",
    message:
      "Bună ziua, aș dori să știu care este prețul pentru schimbarea kitului de distribuție pentru un Volkswagen Golf 6 din 2010, motor 1.6 TDI. Mulțumesc!",
    date: "2025-03-31T11:20:00",
    read: false,
    replied: false,
    replies: [],
  },
  {
    id: 5,
    name: "Cristian Dumitrescu",
    email: "cristian.dumitrescu@example.com",
    subject: "Programare ITP",
    message:
      "Bună ziua, doresc să fac o programare pentru ITP în data de 10 aprilie. Este posibil? Mașina este un Opel Astra H din 2007. Mulțumesc!",
    date: "2025-03-30T16:05:00",
    read: true,
    replied: true,
    replies: [
      {
        id: 1,
        text: "Bună ziua, vă confirmăm că avem disponibilitate pentru ITP în data de 10 aprilie. Vă rugăm să ne spuneți ce interval orar preferați și vom face programarea. Mulțumim!",
        date: "2025-03-30T17:30:00",
      },
    ],
  },
]

export default function MessagesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<(typeof INITIAL_MESSAGES)[0] | null>(null)
  const [replyText, setReplyText] = useState("")
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  // Filter messages based on search query
  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const unreadCount = messages.filter((m) => !m.read).length
  const repliedCount = messages.filter((m) => m.replied).length

  const handleSelectMessage = (message: (typeof INITIAL_MESSAGES)[0]) => {
    setSelectedMessage(message)

    // Mark as read if not already
    if (!message.read) {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, read: true } : m)))
    }
  }

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return

    const newReply = {
      id: Math.max(...(selectedMessage.replies.map((r) => r.id) || [0]), 0) + 1,
      text: replyText,
      date: new Date().toISOString(),
    }

    // Update message as replied and add reply
    setMessages(
      messages.map((m) =>
        m.id === selectedMessage.id
          ? {
              ...m,
              replied: true,
              replies: [...m.replies, newReply],
            }
          : m,
      ),
    )

    toast({
      title: "Răspuns trimis",
      description: `Răspunsul a fost trimis către ${selectedMessage.name}`,
    })

    setReplyText("")

    // Update selected message to show the new reply
    setSelectedMessage((prev) => (prev ? { ...prev, replied: true, replies: [...prev.replies, newReply] } : null))
  }

  const markAllAsRead = () => {
    setMessages(messages.map((m) => ({ ...m, read: true })))

    toast({
      title: "Mesaje actualizate",
      description: "Toate mesajele au fost marcate ca citite",
    })
  }

  const deleteMessage = (messageId: number) => {
    setMessages(messages.filter((m) => m.id !== messageId))

    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(null)
    }

    toast({
      title: "Mesaj șters",
      description: "Mesajul a fost șters cu succes",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mesaje</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Caută mesaje..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">
                Toate <Badge className="ml-1 bg-primary/10 text-primary hover:bg-primary/20">{messages.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">
                Necitite <Badge className="ml-1 bg-primary/10 text-primary hover:bg-primary/20">{unreadCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="replied" className="flex-1">
                Răspunse <Badge className="ml-1 bg-primary/10 text-primary hover:bg-primary/20">{repliedCount}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-2">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex flex-col p-3 rounded-md cursor-pointer transition-colors",
                            selectedMessage?.id === message.id ? "bg-muted" : "hover:bg-muted/50",
                            !message.read && "bg-primary/5",
                          )}
                          onClick={() => handleSelectMessage(message)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{message.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(message.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">{message.email}</div>
                          <div className="text-sm font-medium truncate">{message.subject}</div>
                          <div className="text-xs text-muted-foreground truncate">{message.message}</div>
                          <div className="flex gap-2 mt-1">
                            {!message.read && (
                              <Badge variant="outline" className="text-xs bg-blue-50">
                                Necitit
                              </Badge>
                            )}
                            {message.replied && (
                              <Badge variant="outline" className="text-xs bg-green-50">
                                Răspuns
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">Nu s-au găsit mesaje.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unread" className="mt-2">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {filteredMessages.filter((m) => !m.read).length > 0 ? (
                      filteredMessages
                        .filter((m) => !m.read)
                        .map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex flex-col p-3 rounded-md cursor-pointer transition-colors bg-primary/5",
                              selectedMessage?.id === message.id ? "bg-muted" : "hover:bg-muted/50",
                            )}
                            onClick={() => handleSelectMessage(message)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="font-medium">{message.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(message.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground truncate">{message.email}</div>
                            <div className="text-sm font-medium truncate">{message.subject}</div>
                            <div className="text-xs text-muted-foreground truncate">{message.message}</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-blue-50">
                                Necitit
                              </Badge>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">Nu există mesaje necitite.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="replied" className="mt-2">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {filteredMessages.filter((m) => m.replied).length > 0 ? (
                      filteredMessages
                        .filter((m) => m.replied)
                        .map((message) => (
                          <div
                            key={message.id}
                            className={cn(
                              "flex flex-col p-3 rounded-md cursor-pointer transition-colors",
                              selectedMessage?.id === message.id ? "bg-muted" : "hover:bg-muted/50",
                            )}
                            onClick={() => handleSelectMessage(message)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="font-medium">{message.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(message.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground truncate">{message.email}</div>
                            <div className="text-sm font-medium truncate">{message.subject}</div>
                            <div className="text-xs text-muted-foreground truncate">{message.message}</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-green-50">
                                Răspuns
                              </Badge>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">Nu există mesaje cu răspuns.</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Marchează toate ca citite
            </Button>
          )}
        </div>

        <div>
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <CardDescription>
                      De la: {selectedMessage.name} ({selectedMessage.email})
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="text-sm text-muted-foreground">
                      {new Date(selectedMessage.date).toLocaleString()}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => deleteMessage(selectedMessage.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash-2"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border-b pb-4">
                  <p className="whitespace-pre-line">{selectedMessage.message}</p>
                </div>

                {selectedMessage.replies.length > 0 && (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-sm font-medium">Răspunsuri anterioare</h3>
                    {selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className="bg-muted/50 p-3 rounded-md">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium">Răspuns</span>
                          <span className="text-xs text-muted-foreground">{new Date(reply.date).toLocaleString()}</span>
                        </div>
                        <p className="text-sm whitespace-pre-line">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Răspunde</h3>
                  <Textarea
                    placeholder="Scrie un răspuns..."
                    className="min-h-[150px]"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {selectedMessage.replied && "Acest mesaj a primit deja un răspuns."}
                </div>
                <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Trimite răspuns
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                <p className="text-muted-foreground">Selectează un mesaj pentru a-l vizualiza</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

