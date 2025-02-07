import { Card, CardContent } from "@/components/ui/card";

interface CardProps {
  id: number;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: number;
}

export function YourCards({ cards = [] }: { cards: CardProps[] }) {
  return (
    <div className="space-y-4">
      {cards.length === 0 && "No cards found"}
      {cards.map((card: CardProps) => (
        <Card key={card.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{card.cardNumber}</p>
                <p className="text-sm text-muted-foreground">{card.cardName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Expires: {card.expiryDate}
                </p>
                <p className="text-sm text-muted-foreground">CVV: {card.cvv}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}