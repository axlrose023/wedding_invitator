"""add_guests

Revision ID: c2a3b4d5e6f7
Revises: b1f2c3d4e5a6
Create Date: 2026-07-14 10:00:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "c2a3b4d5e6f7"
down_revision: str | None = "b1f2c3d4e5a6"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "guests",
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("greeting", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("id", sa.UUID(), server_default=sa.text("uuidv7()"), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("guests_pkey")),
    )
    op.create_index(op.f("guests_slug_idx"), "guests", ["slug"], unique=True)

    op.add_column("rsvps", sa.Column("guest_id", sa.UUID(), nullable=True))
    op.create_index(op.f("rsvps_guest_id_idx"), "rsvps", ["guest_id"], unique=False)
    op.create_foreign_key(
        op.f("rsvps_guest_id_fkey"), "rsvps", "guests", ["guest_id"], ["id"]
    )


def downgrade() -> None:
    op.drop_constraint(op.f("rsvps_guest_id_fkey"), "rsvps", type_="foreignkey")
    op.drop_index(op.f("rsvps_guest_id_idx"), table_name="rsvps")
    op.drop_column("rsvps", "guest_id")

    op.drop_index(op.f("guests_slug_idx"), table_name="guests")
    op.drop_table("guests")
