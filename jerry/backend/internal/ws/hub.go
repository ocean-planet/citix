package ws

import (
	"encoding/json"
	"fmt"
)

var (
	hub      *Hub
	clientID = 1
)

const (
	welcomeMsg = iota
	offerMsg
	answerMsg
	exchangeCandidateMsg
	leaveMsg
)

type Message struct {
	Typ        int         `json:"typ"`
	Data       interface{} `json:"data"`
	ReceiverID int         `json:"receiver_id"`
	SenderID   int         `json:"sender_id"`

	client *Client
}

type Hub struct {
	clients map[int]*Client

	broadcast chan *Message

	register chan *Client

	unregister chan int
}

func NewHub() {
	hub = &Hub{
		broadcast:  make(chan *Message),
		register:   make(chan *Client),
		unregister: make(chan int),
		clients:    make(map[int]*Client),
	}
	hub.run()
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			client.id = clientID
			clientID++
			h.clients[client.id] = client
			h.welcomeRequest(&Message{Typ: welcomeMsg, client: client, SenderID: client.id})
		case id := <-h.unregister:
			if client, ok := h.clients[id]; ok {
				close(client.send)
				delete(h.clients, id)
			}
		case message := <-h.broadcast:
			h.routeMessage(message)
		}
	}
}

func (h *Hub) welcomeRequest(msg *Message) {
	for _, client := range h.clients {
		if client != msg.client {
			msg.ReceiverID = client.id
			b, err := json.Marshal(msg)
			if err != nil {
				fmt.Println("failed to marshal message", msg)
				return
			}
			select {
			case client.send <- b:
			default:
				close(client.send)
				delete(h.clients, client.id)
			}
		}
	}
}

func (h *Hub) offerRequest(msg *Message) {
	if client, ok := h.clients[msg.ReceiverID]; ok {
		b, err := json.Marshal(msg)
		if err != nil {
			fmt.Println("failed to marshal message", msg)
			return
		}
		client.send <- b
		return
	}
	fmt.Println("invalid receiver", msg.ReceiverID)
}

func (h *Hub) answerRequest(msg *Message) {
	if client, ok := h.clients[msg.ReceiverID]; ok {
		b, err := json.Marshal(msg)
		if err != nil {
			fmt.Println("failed to marshal message", msg)
			return
		}
		client.send <- b
		return
	}
	fmt.Println("invalid receiver", msg.ReceiverID)
}

func (h *Hub) exchangeCandidateRequest(msg *Message) {
	if client, ok := h.clients[msg.ReceiverID]; ok {
		b, err := json.Marshal(msg)
		if err != nil {
			fmt.Println("failed to marshal message", msg)
			return
		}
		client.send <- b
		return
	}
	fmt.Println("invalid receiver", msg.ReceiverID)
}

func (h *Hub) leaveRequest(msg *Message) {
	for _, client := range h.clients {
		if client != msg.client {
			msg.ReceiverID = client.id
			b, err := json.Marshal(msg)
			if err != nil {
				fmt.Println("failed to marshal message", msg)
				return
			}
			select {
			case client.send <- b:
			default:
				close(client.send)
				delete(h.clients, client.id)
			}
		}
	}
}

func (h *Hub) routeMessage(msg *Message) {
	switch msg.Typ {
	case answerMsg:
		h.answerRequest(msg)
	case offerMsg:
		h.offerRequest(msg)
	case exchangeCandidateMsg:
		h.exchangeCandidateRequest(msg)
	case leaveMsg:
		h.leaveRequest(msg)
	default:
		fmt.Println("invalid msg type", msg.Typ)
	}
}
