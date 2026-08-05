import { useState } from 'react'
import Button from '../../../../components/Button/Button.jsx'
import Input from '../../../../components/Input/Input.jsx'
import { teacherConversations as initialConversations } from '../../../../data/teacherMessages.js'
import '../TeacherPage.css'
import './Messages.css'

function Messages() {
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedId, setSelectedId] = useState(
    initialConversations[0]?.id ?? null,
  )
  const [draft, setDraft] = useState('')

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId,
  )

  function handleSelect(id) {
    setSelectedId(id)
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unread: false }
          : conversation,
      ),
    )
  }

  function handleSend(event) {
    event.preventDefault()
    if (!draft.trim() || !selectedConversation) return

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: conversation.messages.length + 1,
                  from: 'me',
                  text: draft.trim(),
                  time: 'À l’instant',
                },
              ],
            }
          : conversation,
      ),
    )
    setDraft('')
  }

  return (
    <div className="teacher-page">
      <div className="teacher-page__header">
        <div className="teacher-page__heading">
          <h1>Messages</h1>
          <p>Échangez avec les parents de vos élèves.</p>
        </div>
      </div>

      <div className="messages-layout">
        <ul className="conversation-list">
          {conversations.map((conversation) => {
            const lastMessage =
              conversation.messages[conversation.messages.length - 1]
            return (
              <li key={conversation.id}>
                <button
                  type="button"
                  className={`conversation-item${
                    conversation.id === selectedId
                      ? ' conversation-item--active'
                      : ''
                  }`}
                  onClick={() => handleSelect(conversation.id)}
                >
                  <span className="conversation-item__top">
                    <span className="conversation-item__with">
                      {conversation.with}
                    </span>
                    {conversation.unread && (
                      <span
                        className="conversation-item__dot"
                        aria-label="Non lu"
                      />
                    )}
                  </span>
                  <span className="conversation-item__preview">
                    {lastMessage?.text}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="message-thread">
          {selectedConversation ? (
            <>
              <div className="message-thread__header">
                {selectedConversation.with}
              </div>
              <div className="message-thread__body">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-bubble message-bubble--${message.from}`}
                  >
                    <p>{message.text}</p>
                    <span className="message-bubble__time">
                      {message.time}
                    </span>
                  </div>
                ))}
              </div>
              <form
                className="message-thread__composer"
                onSubmit={handleSend}
              >
                <Input
                  aria-label="Votre message"
                  placeholder="Écrire un message…"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                />
                <Button type="submit">Envoyer</Button>
              </form>
            </>
          ) : (
            <div className="message-thread__empty">
              Sélectionnez une conversation
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
