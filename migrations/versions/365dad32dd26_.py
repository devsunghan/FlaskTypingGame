"""empty message

Revision ID: 365dad32dd26
Revises: 575ca92392c1
Create Date: 2022-05-24 16:40:40.459767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '365dad32dd26'
down_revision = '575ca92392c1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('words',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('word', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('words')
    # ### end Alembic commands ###
