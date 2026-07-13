"""add_rsvps

Revision ID: b1f2c3d4e5a6
Revises: aac9c3981adb
Create Date: 2026-07-13 12:00:00.000000

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "b1f2c3d4e5a6"
down_revision: str | None = "aac9c3981adb"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "rsvps",
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("attending", sa.Boolean(), nullable=False),
        sa.Column("comment", sa.String(), nullable=True),
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
        sa.PrimaryKeyConstraint("id", name=op.f("rsvps_pkey")),
    )
    op.create_index(op.f("rsvps_name_idx"), "rsvps", ["name"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("rsvps_name_idx"), table_name="rsvps")
    op.drop_table("rsvps")
